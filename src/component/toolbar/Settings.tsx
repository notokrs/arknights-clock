import {Box, Select, Switch, Text} from '@chakra-ui/react';
import {SettingsProp} from '../../utils/Interface';

function Settings({...props}: SettingsProp) {
  return (
    <Box id="settings" mb={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box className="body">
          <Text>Lore Language</Text>
        </Box>
        <Select
          value={props.settings.loreLang}
          onChange={props.changeLoreLang}
          w="30%"
          size="sm"
        >
          <option value="en">English</option>
          <option value="id">Indonesia</option>
        </Select>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box className="body">
          <Text>Date Language</Text>
        </Box>
        <Select
          value={props.settings.dateLang}
          onChange={props.changeDateLang}
          w="30%"
          size="sm"
        >
          <option value="en-US">English</option>
          <option value="id-ID">Indonesia</option>
        </Select>
      </Box>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Box className="body">
          <Text>Offline Mode</Text>
        </Box>
        <Switch
          isChecked={props.settings.offlineMode}
          onChange={props.changeOfflineMode}
        />
      </Box>
    </Box>
  );
}

export default Settings;
