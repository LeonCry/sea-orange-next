import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
const transfCodeLanguage: Record<string, string> = {
  'language-js': 'language-javascript',
  'language-ts': 'language-typescript',
  'language-vue': 'language-typescript',
  'language-react': 'language-typescript',
};
export const CodeBlock = {
  code({ node, inline, className, children, ...props }: any) {
    const transf = transfCodeLanguage[className] || className;
    const match = /language-(\w+)/.exec(transf || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={oneLight} // theme
        language={match[1].toLowerCase()}
        className="!m-0"
        PreTag="section" // parent tag
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className={transf} {...props}>
        {children}
      </code>
    );
  },
};
