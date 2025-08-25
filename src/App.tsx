import { useEffect, useState } from 'react'
import MermaidViewer from './MermaidViewer'
import { decodeDiagram } from './utils/diagramEncoder'
import './App.css'

function App() {
  const [diagram, setDiagram] = useState<string>('')
  // const [inputDiagram, setInputDiagram] = useState<string>('')
  // const [generatedUrl, setGeneratedUrl] = useState<string>('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const diagramParam = urlParams.get('diagram')
    
    console.log('URL params:', window.location.search)
    console.log('Diagram param:', diagramParam)
    
    if (diagramParam) {
      try {
        const decodedDiagram = decodeDiagram(diagramParam)
        console.log('Decoded diagram:', decodedDiagram)
        setDiagram(decodedDiagram)
        // setInputDiagram(decodedDiagram)
      } catch (error) {
        console.error('Error decoding diagram parameter:', error)
        setDiagram('sequenceDiagram\n    participant A\n    participant B\n    A->>B: Hello\n    B-->>A: World')
      }
    } else {
      console.log('No diagram parameter found, using default')
      const defaultDiagram = 'sequenceDiagram\n    participant A\n    participant B\n    A->>B: Hello\n    B-->>A: World'
      setDiagram(defaultDiagram)
      // setInputDiagram(defaultDiagram)
    }
  }, [])

  // const handleGenerateUrl = () => {
  //   if (inputDiagram.trim()) {
  //     const url = createDiagramUrl(window.location.origin + window.location.pathname, inputDiagram)
  //     setGeneratedUrl(url)
  //     setDiagram(inputDiagram)
  //   }
  // }

  // const handleLoadExample = () => {
  //   const example = getExampleDiagram()
  //   setInputDiagram(example.rawDiagram)
  //   setGeneratedUrl(example.fullUrl.replace('http://localhost:5174', window.location.origin + window.location.pathname))
  //   setDiagram(example.rawDiagram)
  // }

    return (
    <div>
        {diagram ? (
            <MermaidViewer diagram={diagram} />
        ) : (
            <p style={{ color: '#6c757d', fontStyle: 'italic' }}>Loading diagram...</p>
        )}
    </div>
  )
}

export default App
