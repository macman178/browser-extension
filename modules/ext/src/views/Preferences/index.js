import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useConnect } from 'ui/hooks'
import { actions } from 'state'
import { Box, Flex } from '@rebass/emotion'
import { css } from '@emotion/core'
import { getIsoName } from 'utils/isoLanguagesList'
import { SettingHeader, SettingsMenuItem } from 'components/Settings'
import NotificationsIcon from 'assets/notifications-icon.svg'
import GeneralIcon from 'assets/general-icon.svg'
import BlockerIcon from 'assets/blocker-icon.svg'
import PrivacyIcon from 'assets/privacy-icon.svg'
import AccountIcon from 'assets/account-icon.svg'
import WhitelistIcon from 'assets/whitelist-icon-settings.svg'
import { EMAIL } from 'utils/constants'
import Footer from './Footer'
import HeaderInfoRow from './HeaderInfoRow'
import { useTheme } from 'ui/hooks'
import { ThemeContext } from '@emotion/core'
import { createSelector } from 'reselect'

const selector = createSelector(
  s => s.session,
  s => s.language,
  (...args) => args,
)

export default () => {
  const { colors } = useTheme(ThemeContext)
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [session, language] = useConnect(selector)
  const set = v => dispatch(actions.view.set(v))
  return (
    <Flex
      flexDirection="column"
      css={css`
        height: 100%;
        background-color: ${colors.bg};
      `}
    >
      <SettingHeader
        prefName={t('Preferences')}
        AdditionalIcon={NotificationsIcon}
        additionalIconTip="Newsfeed"
        buttonProps={{
          onClick: () => dispatch(actions.view.set('Newsfeed')),
        }}
        noShadow={session.email && session.email_status === EMAIL.UNCONFIRMED}
      >
        <HeaderInfoRow />
      </SettingHeader>
      <Box
        pl={3}
        css={css`
          & > button {
            padding-left: 0 !important;
          }
          border-bottom: 2px solid ${colors.divider};
        `}
      >
        <SettingsMenuItem
          IconLeft={GeneralIcon}
          title={t('General')}
          onClick={() => set('PreferencesGeneral')}
        />
        <SettingsMenuItem
          IconLeft={BlockerIcon}
          title={t('Blocker')}
          onClick={() => set('PreferencesBlocker')}
        />
        <SettingsMenuItem
          IconLeft={PrivacyIcon}
          title={t('Privacy')}
          onClick={() => set('PreferencesPrivacy')}
        />
        <SettingsMenuItem
          IconLeft={AccountIcon}
          title={t('Account')}
          onClick={() =>
            session.username ? set('PreferencesAccount') : set('GhostAccount')
          }
        />
        <SettingsMenuItem
          IconLeft={WhitelistIcon}
          title={t('Whitelist')}
          noBorder
          onClick={() => set('PreferencesWhitelist')}
        />
      </Box>

      <Footer
        lang={getIsoName(language)}
        isGhost={!session.username}
        isPremium={!!session.is_premium}
      />
    </Flex>
  )
}
