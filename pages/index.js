import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Icon,
  Stack,
  Button,
  Box,
  Select,
  Checkbox,
  AccordionPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { HiUpload, HiDownload } from "react-icons/hi";
import { FiCrop } from "react-icons/fi";
import { BsArrowsMove } from "react-icons/bs";

import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/Home.module.css";

const hashnode = {
  width: 720,
  height: 480,
  // ratio: this.width / this.height,
};
const dev = {};
const medium = {};

const defaultImage = "https://picsum.photos/seed/picsum/720/480";

export default function Home() {
  const [image, setImage] = useState(defaultImage);
  const [cropData, setCropData] = useState();
  const [cropper, setCropper] = useState();

  // const cropperRef = useRef(null);
  // const onCrop = () => {
  //   // let imageElement =
  //   //   cropperRef === null || cropperRef === 0 ? 0 : cropperRef.current;
  //   // let cropper =
  //   //   imageElement === null || imageElement === 0 ? 0 : imageElement.cropper;
  //   // console.log(cropper.getCroppedCanvas().toDataURL());
  // };

  // useEffect(() => {
  //   cropper.getCroppedCanvas({
  //     fillColor: "#fff",
  //   });
  // }, []);

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Cropper: Online image cropper for content creators.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <h1>Image cropper for content creators</h1>
      <p>Leave the image resizing issues at bay</p> */}
      <div>
        {/* <p>Select the image you want to crop</p>
        <input type="file" onChange={onChange} />
        <button>Use test image</button>
        <hr /> */}
        <h1>You are creating: Hasnode Blog cover</h1>
        <div className={styles.creatorArea}>
          <div className={styles.presets}>
            <Accordion defaultIndex={[0]} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton _expanded={{ bg: "#E5EAFE" }}>
                    <Box flex="1" textAlign="left">
                      Hashnode
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. */}
                  <Stack>
                    <Checkbox
                      onChange={() => {
                        if (isNaN(cropper.options.aspectRatio)) {
                          console.log(cropper.options.aspectRatio);
                          console.log("just enabled ratio");
                          cropper.setAspectRatio(16 / 8);
                        } else {
                          console.log(cropper.options.aspectRatio);
                          cropper.setAspectRatio(NaN);
                        }
                      }}
                      defaultIsChecked
                    >
                      Article Cover
                    </Checkbox>
                    <Checkbox>Profile cover</Checkbox>
                    <Checkbox>Media Card</Checkbox>
                  </Stack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      DEV
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {/* <h1>Hashnode:</h1>
            <p
              onClick={() => {
                cropper.setAspectRatio(16 / 8);
              }}
            >
              Blog Cover (16:9 ratio)
            </p>
            <p
              onClick={() => {
                cropper.setAspectRatio(16 / 8);
              }}
            >
              Avatar Image (16:9 ratio)
            </p>
            <h3>DEV</h3>
            <p
              onClick={() => {
                cropper.setAspectRatio(16 / 8);
              }}
            >
              Blog Cover (16:9 ratio)
            </p>
            <p
              onClick={() => {
                cropper.setAspectRatio(16 / 8);
              }}
            >
              Avatar image (16:9 ratio)
            </p> */}
          </div>

          <div
            style={{
              width: `1200px`,
              margin: "0 auto",
              // marginTop: "30px",
            }}
          >
            <Cropper
              src={image}
              style={{ height: "480px", width: "100%" }}
              // initialAspectRatio={16 / 9}
              aspectRatio={16 / 9}
              guides={true}
              preview=".img-preview"
              // crop={onCrop}
              // ref={cropperRef}
              disable={false}
              // viewMode={1}
              // minCropBoxHeight={10}
              // minCropBoxWidth={10}
              // background="black"
              // zoom={4}
              // responsive={true}
              // movable={true}
              // autoCropArea={1}
              // checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className={styles.controls}>
              {/* <button
                className={styles.button}
                onClick={() => {
                  cropper.setDragMode("move");
                }}
              >
                Move mode
              </button>
              <button
                className={styles.button}
                onClick={() => {
                  cropper.setDragMode("crop");
                }}
              >
                Crop mode
              </button>
              <button onClick={getCropData}>Crop</button>
              <button
                onClick={() => {
                  console.log(
                    cropper.getCroppedCanvas({
                      width: 160,
                      height: 90,
                    })
                  );
                }}
              >
                Fill
              </button> */}
              <Stack direction="row" spacing={4}>
                <Button
                  onClick={() => {
                    cropper.setDragMode("crop");
                  }}
                  leftIcon={<Icon as={FiCrop} />}
                  colorScheme="orange"
                  variant="solid"
                >
                  Crop
                </Button>
                <Button
                  onClick={() => {
                    cropper.setDragMode("move");
                  }}
                  leftIcon={<Icon as={BsArrowsMove} />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Move
                </Button>
                <Button
                  onClick={() => {
                    cropper.zoom(0.1);
                  }}
                  leftIcon={<Icon as={BsArrowsMove} />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Zoom in
                </Button>
                <Button
                  onClick={() => {
                    cropper.zoom(-0.1);
                  }}
                  leftIcon={<Icon as={BsArrowsMove} />}
                  colorScheme="teal"
                  variant="solid"
                >
                  Zoom out
                </Button>
              </Stack>
            </div>
          </div>

          <div className={styles.tools}>
            <h1>About Hashnode cover image</h1>
            <p>In the page the displayed in 720x480</p>
            <h1>How close is?</h1>
            <p>W progress</p>
            <p>H progress</p>
            <p>Aspect ratio: {cropper ? cropper.options.aspectRatio : 0}</p>
            <h1>Preview:</h1>
            {/* <div style={{ minHeight: "200px", marginBottom: "30px" }}> */}
            <div className="img-preview" style={{ overflow: "hidden" }}></div>
            {/* </div> */}

            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => {
                  cropper.getCroppedCanvas({
                    width: "90px",
                    height: "90px",
                  });
                }}
                rightIcon={<Icon as={HiDownload} />}
                colorScheme="teal"
                variant="solid"
                w={150}
              >
                Download
              </Button>
              <Select placeholder=".PNG" w={24}>
                <option value="option1">.PNG</option>
                <option value="option2">.JPG</option>
              </Select>
            </Stack>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
