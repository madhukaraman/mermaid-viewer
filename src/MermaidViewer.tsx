import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidViewerProps {
  diagram: string;
}

const MermaidViewer: React.FC<MermaidViewerProps> = ({ diagram }) => {
  const mermaidRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    console.log('MermaidViewer received diagram:', diagram);
    if (mermaidRef.current && diagram && isInitialized) {
      const renderMermaid = async () => {
        try {
          console.log('Rendering mermaid diagram...');
          const elementId = `mermaid-diagram-${Date.now()}`;
          mermaidRef.current!.innerHTML = '';

          const { svg } = await mermaid.render(elementId, diagram);
          console.log('Mermaid rendering successful, SVG length:', svg.length);
          mermaidRef.current!.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
          mermaidRef.current!.innerHTML = `<p style="color: red;">Error rendering diagram: ${error}</p>`;
        }
      };

      renderMermaid();
    } else {
      console.log('MermaidViewer: no diagram, ref not ready, or not initialized');
    }
  }, [diagram, isInitialized]);

  return <div ref={mermaidRef} style={{ width: '100%', height: 'auto', minHeight: '200px', border: '1px solid #ccc', padding: '10px' }} />;
};

export default MermaidViewer;
