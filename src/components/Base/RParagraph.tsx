import { SubTitle } from "./Base";


export function RParagraph({ content, title, render: renderItem }: RParagraphProps) {

  const renderIt = renderItem ? renderItem : (s: string) => <div>{s}</div>;

  return (
    <div>
      {title ? <SubTitle title={title} /> : <div />}
      {content.map((s: string, i: number) => <div key={"key-" + i}>{renderIt(s)}</div>)}
    </div>
  );
}

type RParagraphProps = {
  content: string[];
  title?: string;
  render?: (item: string) => JSX.Element;
};

