import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Box } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";

export const getStaticProps = async () => {
  const resp = await fetch(
    "https://netzwelt-devtest.azurewebsites.net/Territories/All"
  );

  const data = await resp.json();

  return {
    props: { netz: data },
  };
};

export default function Home({ netz }) {
  const [territories, setTerritories] = useState(netz.data);
  const [regions, setRegions] = useState(
    territories.filter((territory) => territory.id.length === 1)
  );
  const [subRegions, setSubRegions] = useState(
    territories.filter((territory) => territory.id.length > 3)
  );

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("loggedin");
    router.push("http://localhost:3000/");
  };

  const showBranch = () => {
    return <button>BRANCH</button>;
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        {/* <button onClick={handleLogout}>LOG OUT</button> */}
        <Button
          onClick={handleLogout}
          variant="contained"
          color="error"
          size="small"
          sx={{ margin: "20px", marginRight: "120px" }}
        >
          LOG OUT
        </Button>
        {/* NON MUI IMPLEMENTATION */}
        {/* {regions.map((territory) => (
        <>
          <div key={territory.name}>
            <div>{territory.name}</div>
            <div style={{ paddingLeft: "15px" }}>
              {territories
                .filter((subTerry) => subTerry.parent === territory.id)
                .map((child) => (
                  <>
                    <div>{child.name}</div>
                    <div style={{ paddingLeft: "15px" }}>
                      {subRegions
                        .filter((subChild) => subChild.parent === child.id)
                        .map((lastChild) => (
                          <>
                            <div>{lastChild.name}</div>
                          </>
                        ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        </>
      ))} */}
        <TreeView
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {regions.map((territory) => (
            <React.Fragment key={territory.id}>
              <TreeItem
                key={territory.name}
                nodeId={`${territory.name}`}
                label={`${territory.name}`}
              >
                {territories
                  .filter((subTerry) => subTerry.parent === territory.id)
                  .map((child) => (
                    <React.Fragment key={child.id}>
                      <TreeItem
                        key={child.name}
                        nodeId={`${child.name}`}
                        label={`${child.name}`}
                      >
                        {subRegions
                          .filter((subChild) => subChild.parent === child.id)
                          .map((lastChild) => (
                            <React.Fragment key={lastChild.id}>
                              <TreeItem
                                key={lastChild.name}
                                nodeId={`${lastChild.name}`}
                                label={`${lastChild.name}`}
                              />
                            </React.Fragment>
                          ))}
                      </TreeItem>
                    </React.Fragment>
                  ))}
              </TreeItem>
            </React.Fragment>
          ))}
        </TreeView>
      </Box>
    </>
  );
}
