import { useEffect, useState } from 'react';
import { Window } from '@/app/components/window';
import { WindowInfoPanel } from '@/app/components/window-info-panel';
import { WindowList } from '@/app/components/window-list';
import { useAppDispatch } from '@/lib/redux';
import { setActiveSession } from '@/lib/redux/slices/activeSessionSlice';
import useSessionList from '../hooks/useSessionList';
import {
  useLazyGetSessionQuery,
  useLazySetActiveSessionQuery,
} from '../services/session-api-service';
import TwoPanel from '@/app/components/two-panel';

type FileExplorerSavedSessionsProps = {
  onCloseClick: () => void;
  onContinueSessionClick: () => void;
};

function FileExplorerSavedSessions(
  props: FileExplorerSavedSessionsProps
) {
  const { onCloseClick, onContinueSessionClick } = props;
  const [selectedSession, setSelectedSession] = useState<Session>();
  const { isLoading, error, sessions } = useSessionList();
  const [triggerGetSession] = useLazyGetSessionQuery();
  const [triggerSetActiveSession] = useLazySetActiveSessionQuery();

  const dispatch = useAppDispatch();

  function handleListItemClick(id: string) {
    const session = sessions.find(
      (session) => session.session_id === id
    );
    if (session) {
      setSelectedSession(session);
    }
  }

  async function handleContinueSessionClick() {
    if (selectedSession) {
      const result = await triggerGetSession(selectedSession);
      if (result.data) {
        await triggerSetActiveSession(result.data.session_id);
        dispatch(setActiveSession(result.data));
        onContinueSessionClick();
      }
    }
  }

  return (
    <Window
      id="window-saved-sessions"
      resizeable
      initialXY={[600, 200]}
      initialWindowSize={[720, 470]}
      onCloseClick={onCloseClick}
      name="Saved Sessions">
      <TwoPanel>
        <WindowList styles={{ flexBasis: '35%' }}>
          {sessions
            ? sessions.map((session) => (
                <WindowList.Item
                  key={session.session_id}
                  displayName={session.name}
                  id={session.session_id}
                  onClick={handleListItemClick}
                />
              ))
            : null}
        </WindowList>
        <WindowInfoPanel
          styles={{ flexBasis: '65%', height: '100%' }}>
          <div style={{ height: '100%' }}>
            {selectedSession ? (
              <div style={{ position: 'relative', height: '100%' }}>
                <h3 style={{ fontWeight: 800 }}>Session Info</h3>
                <p style={{ marginBottom: 10 }}>
                  {selectedSession.description}
                </p>
                <p style={{ fontSize: 14 }}>
                  <span style={{ fontWeight: 500, marginRight: 5 }}>
                    Session Name:
                  </span>{' '}
                  <span style={{ color: '#1189b9' }}>
                    {selectedSession.name}
                  </span>
                </p>
                <p style={{ fontSize: 14, marginRight: 5 }}>
                  <span style={{ fontWeight: 500 }}>Session ID:</span>{' '}
                  <span style={{ color: '#1189b9' }}>
                    {selectedSession.session_id}
                  </span>
                </p>
                <p style={{ fontSize: 14, marginRight: 5 }}>
                  <span style={{ fontWeight: 500 }}>Endpoints:</span>{' '}
                  <span style={{ color: '#1189b9' }}>
                    {selectedSession.endpoints
                      .map((endpoint) => endpoint)
                      .join(', ')}
                  </span>
                </p>
                <p style={{ fontSize: 14, marginRight: 5 }}>
                  <span style={{ fontWeight: 500 }}>
                    Metadata File:
                  </span>{' '}
                  <span style={{ color: '#1189b9' }}>
                    {selectedSession.metadata_file}
                  </span>
                </p>
                <p style={{ fontSize: 14, marginRight: 5 }}>
                  <span style={{ fontWeight: 500 }}>Created At:</span>{' '}
                  <span style={{ color: '#1189b9' }}>
                    {new Date(
                      selectedSession.created_epoch * 1000
                    ).toLocaleString()}
                  </span>
                </p>
                <div className="flex justify-end absolute bottom-0 w-full">
                  <button
                    className="btn-primary"
                    type="button"
                    onClick={handleContinueSessionClick}>
                    Continue Session
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </WindowInfoPanel>
      </TwoPanel>
    </Window>
  );
}

export { FileExplorerSavedSessions };
