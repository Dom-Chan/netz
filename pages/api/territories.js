// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handler = async (req, res) => {
  console.log("fetching...");

  try {
    const resp = await fetch(
      "https://netzwelt-devtest.azurewebsites.net/Territories/All"
    );

    const data = await resp.json();
    console.log(data)
    return res.send(JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};

export default handler;
