// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const handler = async (req, res) => {
  console.log("fetching...");

  try {
    const resp = await fetch(
      "https://netzwelt-devtest.azurewebsites.net/Account/SignIn",
      {
        method: req.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body)
      }
    );

    const data = await resp.json();
    return res.send(JSON.stringify(data))
    
  } catch (error) {
    
    console.log(error);
  }
};

export default handler;
