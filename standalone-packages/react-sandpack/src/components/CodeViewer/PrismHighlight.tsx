import * as React from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { getPrismTheme } from './utils';

import { styled } from '../../stitches.config';
import { ThemeContext } from '../../utils/theme-context';

export interface PrismHighlightProps {
  lang?: Language;
  customStyle?: React.CSSProperties;
  code: string;
  showLineNumbers?: boolean;
}

const StyledBlock = styled('div', {
  fontSize: '$default',
  backgroundColor: '$mainBackground',
  padding: '$4 $2',
  lineHeight: '1.4',
  overflow: 'auto',
  flex: 1,

  pre: {
    margin: 0,
    fontFamily: '$mono',
  },
});

const Line = styled('div', {
  display: 'table-row',
});

const LineNo = styled('span', {
  display: 'table-cell',
  textAlign: 'right',
  paddingRight: '$2',
  userSelect: 'none',
  color: '$defaultText',
  minWidth: '28px',
});

const LineContent = styled('span', {
  display: 'table-cell',
  paddingLeft: '$1',
});

export const PrismHighlight = ({
  lang = 'javascript',
  customStyle,
  code,
  showLineNumbers,
}: PrismHighlightProps) => {
  const theme = React.useContext(ThemeContext);

  return (
    <StyledBlock style={customStyle}>
      <Highlight
        {...defaultProps}
        theme={getPrismTheme(theme)}
        code={code}
        language={lang}
      >
        {({
          className,
          style: preStyle,
          tokens,
          getLineProps,
          getTokenProps,
        }) => (
          <pre className={className} style={preStyle}>
            {tokens.map((line, i) => (
              <Line {...getLineProps({ line, key: i })}>
                {showLineNumbers && <LineNo>{i + 1}</LineNo>}
                <LineContent>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </pre>
        )}
      </Highlight>
    </StyledBlock>
  );
};