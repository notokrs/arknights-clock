import {Box, useDisclosure} from '@chakra-ui/react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ToolbarProps} from '../../utils/Interface';
import ModalComp from '../_template/ModalComp';
import Info from './Info';
import Settings from './Settings';

/* eslint-disable jsx-a11y/anchor-is-valid */
function Toolbar({...props}: ToolbarProps) {
  const {
    isOpen: isOpenSettings,
    onOpen: onOpenSettings,
    onClose: onCloseSettings,
  } = useDisclosure();

  const {
    isOpen: isOpenInfo,
    onOpen: onOpenInfo,
    onClose: onCloseInfo,
  } = useDisclosure();

  return (
    <Box className="toolbar">
      <a className="icon" title="Refresh" onClick={() => props.refresh()}>
        <FontAwesomeIcon icon={['fas', 'arrows-rotate']} size="xl" />
      </a>
      <a className="icon" title="Settings" onClick={onOpenSettings}>
        <FontAwesomeIcon icon={['fas', 'gear']} size="xl" />
        <ModalComp
          title="Settings"
          body={
            <Settings
              settings={props.settings}
              changeLoreLang={props.changeLoreLang}
              changeOfflineMode={props.changeOfflineMode}
              changeDateLang={props.changeDateLang}
            />
          }
          isOpen={isOpenSettings}
          onClose={onCloseSettings}
        />
      </a>
      <a className="icon" title="Info" onClick={onOpenInfo}>
        <FontAwesomeIcon icon={['fas', 'info-circle']} size="xl" />
        <ModalComp
          title="Info"
          body={<Info />}
          isOpen={isOpenInfo}
          onClose={onCloseInfo}
        />
      </a>
    </Box>
  );
}

export default Toolbar;
