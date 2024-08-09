'use client';
import Link from 'next/link';
import React from 'react';
import { colors } from '@/app/views/shared-components/customColors';
import { Icon, IconName } from '@components/IconSVG';
import SignOutButton from '@components/sign-out-button';

type menuItem =
  | 'benchmarking'
  | 'redteaming'
  | 'endpoints'
  | 'history'
  | 'utils'
  | 'signout';

type LeftNavProps = {
  activeItem?: menuItem;
};

function LeftNav({ activeItem }: LeftNavProps) {
  const [hoveredItem, setHoveredItem] = React.useState<menuItem | undefined>();

  return (
    <ul className="flex flex-col gap-10">
      <li className="flex justify-center">
        <Link
          href="/redteaming"
          onMouseEnter={() => setHoveredItem('redteaming')}
          onMouseLeave={() => setHoveredItem(undefined)}
          className="relative">
          {(hoveredItem === 'redteaming' || activeItem === 'redteaming') && (
            <p className="absolute tracking-wider text-moonpurplelight right-[50px] w-[200px] text-right">
              red teaming
            </p>
          )}
          <Icon
            color={
              activeItem === 'redteaming'
                ? colors.moonpurplelight
                : hoveredItem === 'redteaming'
                  ? colors.moonpurplelight
                  : colors.moongray[300]
            }
            name={IconName.Spacesuit}
            size={40}
          />
        </Link>
      </li>
      <li className="flex justify-center">
        <Link
          href="/history"
          onMouseEnter={() => setHoveredItem('history')}
          onMouseLeave={() => setHoveredItem(undefined)}
          className="relative">
          {(hoveredItem === 'history' || activeItem === 'history') && (
            <p className="absolute tracking-wider text-moonpurplelight right-[50px] w-[200px] text-right">
              history
            </p>
          )}
          <Icon
            color={
              activeItem === 'history'
                ? colors.moonpurplelight
                : hoveredItem === 'history'
                  ? colors.moonpurplelight
                  : colors.moongray[300]
            }
            name={IconName.HistoryClock}
            size={40}
          />
        </Link>
      </li>
      <li className="flex justify-center">
        <div className="relative">
          <SignOutButton
            onMouseEnter={() => setHoveredItem('signout')}
            onMouseLeave={() => setHoveredItem(undefined)}
            color={
              activeItem === 'signout'
                ? colors.moonpurplelight
                : hoveredItem === 'signout'
                  ? colors.moonpurplelight
                  : colors.moongray[300]
            }
          />
          {(hoveredItem === 'signout' || activeItem === 'signout') && (
            <p className="absolute tracking-wider text-moonpurplelight right-[50px] w-[200px] text-right">
              sign out
            </p>
          )}
        </div>
      </li>
    </ul>
  );
}

export default LeftNav;