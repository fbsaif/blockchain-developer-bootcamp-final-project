import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { create } from "ipfs-http-client";
import SignatureCanvas from "react-signature-canvas";
import Navbar from './Navbar'
import background from "./assests/bg/background.png";



const ipfsClient = create("https://ipfs.infura.io:5001/api/v0");

export const StyledButton = styled.button`
  padding: 8px;
`;
export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;
export const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  @media (min-width: 767px) {
    width: 350px;
    height: 350px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("Sign or draw something and click on MINT");
  const [NFTS, setNFTS] = useState([]);
  const elementRef = useRef();
  
  
  const ipfsBaseUrl = "https://ipfs.infura.io/ipfs/";
  const name = "Good NFT";
  const description = "A donation made by minting an NFT";
  
  console.log(NFTS);

  const mint = (_uri) => {
    setFeedback("Minting your GoodNFT...");
    blockchain.smartContract.methods
      .mint(blockchain.account, _uri)
      .send({ from: blockchain.account, value: 10000000000000000})
      .once("error", (err) => {
        console.log(err);
        setLoading(false);
        setFeedback("Sorry, something went wrong please try again later.");
      })
      .then((receipt) => {
        console.log(receipt);
        setLoading(false);
        clearCanvas();
        dispatch(fetchData(blockchain.account));
        setFeedback("Successfully minting your NFT, Thank you for your donation");
      });
  };

  const createMetaDataAndMint = async (_name, _des, _imgBuffer) => {
    setLoading(true);
    setFeedback("Minting Your NFT");
    try {
      const addedImage = await ipfsClient.add(_imgBuffer);
      const metaDataObj = {
        name: _name,
        description: _des,
        image: ipfsBaseUrl + addedImage.path,
      };
      const addedMetaData = await ipfsClient.add(JSON.stringify(metaDataObj));
      console.log(ipfsBaseUrl + addedMetaData.path);
      mint(ipfsBaseUrl + addedMetaData.path);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setFeedback("Error");
    }
  };

  const startMintingProcess = () => {
    createMetaDataAndMint(name, description, getImageData());
  };

  const getImageData = () => {
    const canvasEl = elementRef.current;
    let dataUrl = canvasEl.toDataURL("image/png");
    const buffer = Buffer(dataUrl.split(",")[1], "base64");
    return buffer;
  };

  const fetchMetatDataForNFTS = () => {
    setNFTS([]);
    data.allTokens.forEach((nft) => {
      fetch(nft.uri)
        .then((response) => response.json())
        .then((metaData) => {
          setNFTS((prevState) => [
            ...prevState,
            { id: nft.id, metaData: metaData },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const clearCanvas = () => {
    const canvasEl = elementRef.current;
    canvasEl.clear();
  };

  useEffect(() => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  }, [blockchain.smartContract, dispatch]);

  useEffect(() => {
    fetchMetatDataForNFTS();
  }, [data.allTokens]);

  return (
    <s.Screen image={background} style={{ backgroundColor: "var(--yellow)" }}>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }} >
       <Navbar />
       <s.SpacerMedium />
       <s.TextTitle
          
        >
          Account:{blockchain.account}
          
        </s.TextTitle>
      </s.Container>
      <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          Mint your GoodNFT...and make a donation
        </s.TextTitle>
        <s.SpacerMedium />
        <s.TextTitle
          style={{ textAlign: "center", fontSize: 28, fontWeight: "bold" }}
        >
          We appreciate that you thought of us!
        </s.TextTitle>
        <s.SpacerMedium />
           
            <s.TextTitle 
              style={{ textAlign: "center", fontSize: 35, fontWeight: "bold" }}
            >
              NFTs Minted: {data.totalSupply} out of 50
            </s.TextTitle>
          
          <s.SpacerMedium />
          <s.Container
            flex={1}
            jc={"center"}
            ai={"center"}
            style={{ backgroundColor: "#383838", padding: 24 }}
          >
            {Number(data.totalSupply) == 50 ? (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  The donation has ended.
                </s.TextTitle>
              </>
            ) : (
              <>
                <s.TextTitle style={{ textAlign: "center" }}>
                  Donation costs 0.01 ETH per NFT
                </s.TextTitle>
                <s.SpacerXSmall />
                
                <s.SpacerXSmall />
                <s.TextDescription style={{ textAlign: "center", fontSize: 22}}>
                  {feedback}
                </s.TextDescription>
                <s.SpacerSmall />
                <s.SpacerMedium />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription style={{ textAlign: "center" }}>
                      Connect Your Wallet 
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription style={{ textAlign: "center" }}>
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <s.Container flex={1} ai={"center"} style={{ padding: 24 }}>
                    
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                    <StyledButton
                      disabled={loading ? 1 : 0}
                      onClick={(e) => {
                        e.preventDefault();
                        startMintingProcess();
                      }}
                    >
            MINT
            </StyledButton>
            <s.SpacerSmall />
            <StyledButton
              disabled={loading ? 1 : 0}
              onClick={(e) => {
                e.preventDefault();
                clearCanvas();
              }}
            >
              CLEAR
            </StyledButton>
            <s.SpacerLarge />
            </s.Container>
            <s.SpacerLarge />
          <SignatureCanvas
            backgroundColor={"#4f8edb"}
            canvasProps={{ width: 350, height: 350 }}
            ref={elementRef}
          />
          <s.SpacerLarge />
          <s.Container flex={1} jc={"center"} ai={"center"} style={{ width: "70%" }} fd={"row"} style={{ flexWrap: "wrap" }}>
        {data.loading ? (
            <>
              <s.SpacerSmall />
              <s.TextDescription style={{ textAlign: "center" }}>
                loading...
              </s.TextDescription>
            </>
          ) : (
            NFTS.map((nft, index) => {
              return (
                <s.Container key={index} style={{ padding: 16 }}>
                  <s.TextTitle >{nft.metaData.name}</s.TextTitle>
                  <s.SpacerSmall />
                  <img
                    alt={nft.metaData.name}
                    src={nft.metaData.image}
                    width={150}
                  />
                </s.Container>
              );
            })
          )}
        </s.Container>.
      </s.Container>
          
                )}
              </>
            )}
      </s.Container>          
        <s.SpacerSmall />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription style={{ textAlign: "center", fontSize: 15}}>
            This project is built for the consensys bootcamp final project, and 
          </s.TextDescription>
          <s.SpacerSmall />
          <s.TextDescription style={{ textAlign: "center", fontSize: 15 }}>
            It is an experiment to make a donation through minting your drawing or signiture as an NFT and upload it to IPFS
          </s.TextDescription>
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}

export default App;