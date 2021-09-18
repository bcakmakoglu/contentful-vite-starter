import { EditorExtensionSDK, EntryAPI } from '@contentful/app-sdk'
import { css } from '@emotion/css'

interface EditorProps {
  sdk: EditorExtensionSDK
}

const Entry = ({ sdk }: EditorProps) => {
  const entry: EntryAPI = sdk.entry
  const fields = Object.entries(entry.fields).map(([_, f]) => {
    let html = null
    switch (f.id) {
      case 'name':
        html = (
          <FormaTextField
            key={f.id}
            name={f.id}
            id={f.id}
            labelText={capitalize(f.id)}
            required={f.required}
            value={f.getValue()}
            onChange={(e) => {
              e.preventDefault()
              f.setValue(e.target.value)
            }}
            className="f36-margin-bottom--m"
          />
        )
    }
    return html
  })

  return (
    <FormaForm
      className={css({
        padding: 20,
      })}
    >
      {fields}
      <FormaButton onClick={() => sdk.dialogs.selectSingleAsset()}>Check Assets</FormaButton>
    </FormaForm>
  )
}

export default Entry
