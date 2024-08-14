import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'

const Editor = () => {
  const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      paragraph: Paragraph,
      header: Header
    },
    placeholder: 'Type here to write...',
    onChange: (e) => {
      console.log(e)
    }
  })

  return <div id="editorjs" />
}

export default Editor
