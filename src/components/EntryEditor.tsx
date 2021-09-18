import { EditorExtensionSDK } from '@contentful/app-sdk'

interface EditorProps {
  sdk: EditorExtensionSDK
}

const Entry = (props: EditorProps) => {
  return <FormaParagraph>Hello Entry!</FormaParagraph>
}

export default Entry
