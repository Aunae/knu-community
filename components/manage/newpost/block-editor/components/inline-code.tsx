interface Props {
  children: React.ReactNode;
}
const InlineCode = ({ children }: Props) => {
  return <code>{children}</code>;
};

export default InlineCode;
