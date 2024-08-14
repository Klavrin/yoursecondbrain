import EditorJS from '@editorjs/editorjs'
import Paragraph from '@editorjs/paragraph'
import Header from '@editorjs/header'
import Checklist from '@editorjs/checklist'
import NestedList from '@editorjs/nested-list'
import Table from '@editorjs/table'

const Editor = () => {
  const editor = new EditorJS({
    holder: 'editorjs',
    tools: {
      paragraph: Paragraph,
      header: Header,
      checklist: Checklist,
      nestedList: NestedList,
      table: Table
    },
    placeholder: 'Type here to write...',
    onChange: (e) => {
      console.log(e)
    }
  })

  return <div id="editorjs" />
}

export default Editor
