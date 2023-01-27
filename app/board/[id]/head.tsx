const getPost = async (id: string) => {
  const url = process.env.BASE_URL || 'http://localhost:3000';
  const data = await (await fetch(`${url}/api/post/${id}`)).json();
  if (data.status === 200) return data.data.title;
  else return 'Not found post';
};

type Props = {
  params: { id: string };
};

const Head = async ({ params }: Props) => {
  const title = await getPost(params.id);
  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
};

export default Head;