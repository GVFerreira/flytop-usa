// components/QuillEditor.tsx
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

import 'react-quill/dist/quill.snow.css'

interface QuillEditorProps {
  value: string
  onChange: (value: string) => void
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} modules={modules} />
}

const modules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    ['clean'] // Botão para limpar formatação
  ]
}

export default QuillEditor
