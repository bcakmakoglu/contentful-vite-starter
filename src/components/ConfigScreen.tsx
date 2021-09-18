import { AppExtensionSDK } from '@contentful/app-sdk'
import { css } from '@emotion/css'

export interface AppInstallationParameters {}

interface ConfigProps {
  sdk: AppExtensionSDK
}

const Config = (props: ConfigProps) => {
  const [parameters, setParameters] = useState<AppInstallationParameters>({})

  const onConfigure = useCallback(async () => {
    // This method will be called when a user clicks on "Install"
    // or "Save" in the configuration screen.
    // for more details see https://www.contentful.com/developers/docs/extensibility/ui-extensions/sdk-reference/#register-an-app-configuration-hook

    // Get current the state of EditorInterface and other entities
    // related to this app installation
    const currentState = await props.sdk.app.getCurrentState()

    return {
      // Parameters to be persisted as the app configuration.
      parameters,
      // In case you don't want to submit any update to app
      // locations, you can just pass the currentState as is
      targetState: currentState,
    }
  }, [parameters, props.sdk])

  useEffect(() => {
    // `onConfigure` allows to configure a callback to be
    // invoked when a user attempts to install the app or update
    // its configuration.
    props.sdk.app.onConfigure(() => onConfigure())
  }, [props.sdk, onConfigure])

  useEffect(() => {
    ;(async () => {
      // Get current parameters of the app.
      // If the app is not installed yet, `parameters` will be `null`.
      const currentParameters: AppInstallationParameters | null = await props.sdk.app.getParameters()

      if (currentParameters) setParameters(currentParameters)

      // Once preparation has finished, call `setReady` to hide
      // the loading screen and present the app to a user.
      props.sdk.app.setReady()
    })()
  }, [props.sdk])

  return (
    <FormaWorkbench className={css({ margin: '80px' })}>
      <FormaForm>
        <FormaHeading>App Config</FormaHeading>
        <FormaParagraph>Welcome to your contentful app. This is your config page.</FormaParagraph>
      </FormaForm>
    </FormaWorkbench>
  )
}

export default Config
