import { useEffect, useRef, useState } from 'react';
import TwoPanel from '@/app/components/two-panel';
import { Window } from '@/app/components/window';
import { WindowInfoPanel } from '@/app/components/window-info-panel';
import { WindowList } from '@/app/components/window-list';
import { useCreateRecipeMutation } from '@/app/services/recipe-api-service';
import { RecipeDetailsCard } from './components/recipe-details-card';
import { RecipeItemCard } from './components/recipe-item-card';
// import { NewRecipeFlow } from ./components/new-recipe-flow'; to be added
import { TaglabelsBox } from './components/tag-labels-box';
import {
  RecipesExplorerButtonAction,
  TopButtonsBar,
} from './components/top-buttons-bar';
import { useRecipeList } from './hooks/useRecipeList';

type RecipesExplorerProps = {
  windowId: string;
  mini?: boolean;
  recipes?: Recipe[];
  title?: string;
  initialXY: [number, number];
  initialSize: [number, number];
  zIndex: number | 'auto';
  hideMenuButtons?: boolean;
  buttonAction?: RecipesExplorerButtonAction;
  returnedRecipe?: Recipe;
  onListItemClick?: (recipe: Recipe) => void;
  onCloseClick: () => void;
  onWindowChange?: (
    x: number,
    y: number,
    width: number,
    height: number,
    scrollTop: number,
    windowId: string
  ) => void;
};

function getWindowSubTitle(selectedBtnAction: RecipesExplorerButtonAction) {
  switch (selectedBtnAction) {
    case RecipesExplorerButtonAction.SELECT_RECIPES:
      return `Recipes`;
    case RecipesExplorerButtonAction.VIEW_RECIPES:
      return `Recipes`;
    case RecipesExplorerButtonAction.ADD_NEW_RECIPE:
      return `Recipes`;
  }
}

function RecipesExplorer(props: RecipesExplorerProps) {
  const {
    windowId,
    title,
    mini = false,
    hideMenuButtons = false,
    buttonAction = RecipesExplorerButtonAction.SELECT_RECIPES,
    initialXY = [600, 200],
    initialSize = [720, 470],
    zIndex,
    returnedRecipe,
    onCloseClick,
    onListItemClick,
    onWindowChange,
  } = props;
  const {
    recipes,
    error,
    isLoading,
    refetch: refetchRecipes,
  } = useRecipeList();
  const [
    createRecipe,
    {
      data: newRecipe,
      isLoading: createRecipeIsLoding,
      error: createCookbookError,
    },
  ] = useCreateRecipeMutation();

  const [selectedBtnAction, setSelectedBtnAction] =
    useState<RecipesExplorerButtonAction>(
      RecipesExplorerButtonAction.VIEW_RECIPES
    );
  const [selectedRecipeList, setSelectedRecipesList] = useState<Recipe[]>([]);
  const [displayedRecipesList, setDisplayedRecipesList] = useState<Recipe[]>(
    []
  );
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>();
  const [newlyAddedRecipeName, setNewlyAddedRecipeName] = useState<
    string | undefined
  >();

  const isTwoPanel =
    !mini &&
    (selectedBtnAction === RecipesExplorerButtonAction.SELECT_RECIPES ||
      selectedBtnAction === RecipesExplorerButtonAction.ADD_NEW_RECIPE ||
      (selectedBtnAction === RecipesExplorerButtonAction.VIEW_RECIPES &&
        selectedRecipe));

  const initialDividerPosition =
    selectedBtnAction === RecipesExplorerButtonAction.ADD_NEW_RECIPE ? 55 : 40;

  const footerText = recipes.length
    ? `${recipes.length} Recipe${recipes.length > 1 ? 's' : ''}`
    : '';

  const miniFooterText = `${recipes.length - displayedRecipesList.length} / ${footerText} Selected`;

  const windowTitle = title || getWindowSubTitle(selectedBtnAction);

  function selectItem(name: string) {
    const recipe = recipes.find((epoint) => epoint.name === name);
    if (recipe) {
      setSelectedRecipe(recipe);
    }
  }

  function handleListItemClick(name: string) {
    return () => {
      if (selectedBtnAction === RecipesExplorerButtonAction.VIEW_RECIPES) {
        selectItem(name);
      } else if (
        selectedBtnAction === RecipesExplorerButtonAction.SELECT_RECIPES
      ) {
        const clickedrecipe = recipes.find((epoint) => epoint.name === name);
        if (!clickedrecipe) return;

        if (
          selectedRecipeList.findIndex((epoint) => epoint.name === name) > -1
        ) {
          setSelectedRecipesList((prev) =>
            prev.filter((epoint) => epoint.name !== clickedrecipe.name)
          );
        } else {
          setSelectedRecipesList((prev) => [...prev, clickedrecipe]);
        }

        if (onListItemClick) {
          onListItemClick(clickedrecipe);
          // Hide the clicked item from the list by filtering it out
          const updatedrecipes = displayedRecipesList.filter(
            (recipe) => recipe.id !== clickedrecipe.id
          );
          setDisplayedRecipesList(updatedrecipes);
        }
      }
    };
  }

  function handleListItemHover(name: string) {
    return () => selectItem(name);
  }

  function handleButtonClick(action: RecipesExplorerButtonAction) {
    setSelectedBtnAction(action);
  }

  function sortDisplayedrecipesByName(list: Recipe[]): Recipe[] {
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }

  async function submitNewRecipe(data: RecipeFormValues) {
    console.log(data);
    const newRecipe = {
      name: data.name,
      tags: data.tags,
      description: data.description,
      datasets: data.datasets,
      prompt_templates: data.prompt_templates,
      metrics: data.metrics,
      attack_modules: data.attack_modules,
      categories: data.categories,
      grading_scale: data.grading_scale,
      id: data.id,
      stats: data.stats,
      total_prompt_in_recipe: data.total_prompt_in_recipe,
    };
    const response = await createRecipe(newRecipe);
    if ('error' in response) {
      console.error(response.error);
      //TODO - create error visuals
      return;
    }
    setSelectedBtnAction(RecipesExplorerButtonAction.VIEW_RECIPES);
    //@ts-ignore
    refetchRecipes();
  }

  useEffect(() => {
    if (!isLoading && recipes) {
      setDisplayedRecipesList(sortDisplayedrecipesByName(recipes));
    }
  }, [isLoading, recipes]);

  useEffect(() => {
    if (buttonAction && hideMenuButtons) {
      setSelectedBtnAction(buttonAction);
    }
  }, [buttonAction, hideMenuButtons]);

  useEffect(() => {
    if (returnedRecipe) {
      if (mini) {
        setDisplayedRecipesList(
          sortDisplayedrecipesByName([returnedRecipe, ...displayedRecipesList])
        );
      }
    }
  }, [returnedRecipe]);

  return (
    <Window
      id={windowId}
      resizeable={true}
      initialXY={initialXY}
      zIndex={zIndex}
      initialWindowSize={initialSize}
      onCloseClick={onCloseClick}
      onWindowChange={onWindowChange}
      name={windowTitle}
      leftFooterText={mini ? miniFooterText : footerText}
      footerHeight={30}
      contentAreaStyles={{ backgroundColor: 'transparent' }}
      topBar={
        hideMenuButtons ? null : (
          <TopButtonsBar
            onButtonClick={handleButtonClick}
            activeButton={selectedBtnAction}
          />
        )
      }>
      {isLoading ? (
        <div className="ring">
          Loading
          <span />
        </div>
      ) : (
        <>
          {isTwoPanel ? (
            <TwoPanel initialDividerPosition={initialDividerPosition}>
              <WindowList
                disableMouseInteraction={
                  selectedBtnAction ===
                  RecipesExplorerButtonAction.ADD_NEW_RECIPE
                    ? true
                    : false
                }
                styles={{ backgroundColor: '#FFFFFF' }}>
                {displayedRecipesList
                  ? displayedRecipesList.map((recipe) => (
                      <WindowList.Item
                        key={recipe.id}
                        id={recipe.name}
                        className="justify-start"
                        enableCheckbox={
                          selectedBtnAction ===
                          RecipesExplorerButtonAction.SELECT_RECIPES
                        }
                        checked={
                          selectedRecipeList.findIndex(
                            (epoint) => epoint.name === recipe.name
                          ) > -1
                        }
                        onClick={handleListItemClick(recipe.name)}
                        onHover={
                          selectedBtnAction ===
                          RecipesExplorerButtonAction.SELECT_RECIPES
                            ? handleListItemHover(recipe.name)
                            : undefined
                        }
                        selected={
                          selectedRecipe
                            ? selectedRecipe.name === recipe.name
                            : false
                        }>
                        <RecipeItemCard
                          recipe={recipe}
                          className="w-[94%]"
                        />
                      </WindowList.Item>
                    ))
                  : null}
              </WindowList>
              {selectedBtnAction ===
              RecipesExplorerButtonAction.ADD_NEW_RECIPE ? (
                <div className="flex flex-1 justify-center h-full">
                  {/* <NewRecipeForm onFormSubmit={submitNewRecipe} /> */}
                </div>
              ) : selectedBtnAction ===
                  RecipesExplorerButtonAction.SELECT_RECIPES ||
                selectedBtnAction ===
                  RecipesExplorerButtonAction.VIEW_RECIPES ? (
                <div className="flex flex-col h-full">
                  <div
                    className={`${
                      selectedBtnAction ===
                        RecipesExplorerButtonAction.SELECT_RECIPES &&
                      selectedRecipeList.length
                        ? 'h-[60%]'
                        : 'h-full'
                    } bg-white`}>
                    <WindowInfoPanel title="Recipe Details">
                      <div className="h-full overflow-x-hidden overflow-y-auto custom-scrollbar mr-[2px]">
                        {selectedRecipe ? (
                          <div className="flex flex-col gap-6">
                            <RecipeDetailsCard recipe={selectedRecipe} />
                          </div>
                        ) : null}
                      </div>
                    </WindowInfoPanel>
                  </div>
                  {selectedBtnAction ===
                    RecipesExplorerButtonAction.SELECT_RECIPES &&
                  selectedRecipeList.length ? (
                    <div className="h-[60%] flex items-center pt-4">
                      <>
                        <TaglabelsBox
                          tags={[]}
                          onTagRemove={() => null}
                        />
                      </>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </TwoPanel>
          ) : (
            <WindowList styles={{ backgroundColor: '#FFFFFF' }}>
              {displayedRecipesList
                ? displayedRecipesList.map((recipe) => (
                    <WindowList.Item
                      key={recipe.id}
                      id={recipe.name}
                      onClick={handleListItemClick(recipe.name)}>
                      <RecipeItemCard recipe={recipe} />
                    </WindowList.Item>
                  ))
                : null}
            </WindowList>
          )}
        </>
      )}
    </Window>
  );
}

export { RecipesExplorer };
