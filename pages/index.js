import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {
  Text,
  Heading,
  Icon,
  Stack,
  Button,
  Box,
  Select,
  // Checkbox,
  AccordionPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { HiUpload, HiDownload } from "react-icons/hi";
import { FiCrop } from "react-icons/fi";
import { BsArrowsMove } from "react-icons/bs";

import ContentWrapper from "../components/ContentWrapper";
import { hashnode } from "../presets.js";

import Checkbox from "../components/Checkbox";
import styles from "../styles/Home.module.css";

// const defaultImage = "https://picsum.photos/seed/picsum/720/480";
let defaultImage;

export default function Home() {
  const [image, setImage] = useState(defaultImage);
  // const [cropData, setCropData] = useState();
  const [baseImage, setBaseImage] = useState("");
  const [cropper, setCropper] = useState();

  const [isDragActive, setIsDragActive] = useState(true);
  const [dragArea, setDragArea] = useState({
    width: 0,
    height: 0,
  });

  const cropperRef = useRef(null);
  const onCrop = () => {
    let imageElement =
      cropperRef === null || cropperRef === 0 ? 0 : cropperRef.current;
    let cropper =
      imageElement === null || imageElement === 0 ? 0 : imageElement.cropper;
    setDragArea({
      ...dragArea,
      width: cropper.cropBoxData.width,
      height: cropper.cropBoxData.height,
    });

    setBaseImage(cropper.getCroppedCanvas().toDataURL());

    // console.log(cropper);
    // console.log(cropper.getCroppedCanvas().toDataURL());
  };

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
    <div>
      <Head>
        <title>Cropper: Online image cropper for content creators.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!image ? (
        <ContentWrapper>
          <div className={styles.heroArea}>
            <h1 className={styles.heroTitle}>
              Image cropper for content creators
            </h1>
            <p className={styles.heroSubTitle}>
              Leave the image resizing issues at bay
            </p>

            <div className={styles.heroSelect}>
              <div>Image</div>
              <div>
                <p>Select the image you want to crop</p>
                <input type="file" onChange={onChange} />
                <button>Use test image</button>
              </div>
            </div>
          </div>
        </ContentWrapper>
      ) : (
        <div className={styles.creatorArea}>
          <div className={styles.presets}>
            <Accordion defaultIndex={[0]} allowToggle>
              <AccordionItem borderRadius={5}>
                <h2>
                  <AccordionButton
                    _expanded={{ bg: "#E5EAFE", borderRadius: "5" }}
                  >
                    <Box flex="1" textAlign="left">
                      Hashnode
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Stack>
                    {hashnode.map((el, i) => {
                      return (
                        <Checkbox
                          key={i}
                          cropper={cropper}
                          index={i}
                          title={el.name}
                          width={el.width}
                          height={el.height}
                        />
                      );
                    })}
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
              <p>Custom dimensions:</p>
              <p>Width: {dragArea.width}</p>
              <p>Height: {Math.round(dragArea.height)}</p>
            </Accordion>
          </div>

          <div
            style={{
              width: `1200px`,
              margin: "0 auto",
            }}
          >
            <Cropper
              src={image}
              style={{ height: "480px", width: "100%" }}
              // initialAspectRatio={16 / 9}
              aspectRatio={1600 / 840}
              guides={true}
              preview=".preview"
              crop={onCrop}
              ref={cropperRef}
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
              // crop={() => {
              //   console.log(124);
              // }}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className={styles.controls}>
              <Stack direction="row" spacing={4}>
                <Button
                  onClick={() => {
                    cropper.setDragMode("crop");
                    setIsDragActive(true);
                  }}
                  leftIcon={<Icon as={FiCrop} />}
                  colorScheme="orange"
                  variant="solid"
                  isActive={isDragActive}
                >
                  Crop
                </Button>
                <Button
                  onClick={() => {
                    cropper.setDragMode("move");
                    setIsDragActive(false);
                    console.log(cropper);
                  }}
                  leftIcon={<Icon as={BsArrowsMove} />}
                  colorScheme="orange"
                  variant="solid"
                  isActive={!isDragActive}
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
            <div className={styles.titleBox}>
              <h1>About Hashnode cover image</h1>
            </div>

            <p>In the page the displayed in 720x480</p>

            <Box bg="grey" w="100%" p={3} color="white">
              <h1>How close is to recommended?</h1>
            </Box>

            <p>W progress</p>
            <p>H progress</p>
            <p>Aspect ratio: {cropper ? cropper.options.aspectRatio : 0}</p>

            <Box bg="grey" w="100%" p={3} mb={3} color="white">
              <h1>Preview:</h1>
            </Box>

            <div
              style={{
                // border: "1px solid green",
                height: "auto",
                width: "100%",
                position: "relative",
                marginBottom: "20px",
                // display: "grid",
                // placeItems: "center",
              }}
            >
              <div
                className="preview"
                style={{
                  height: "200px",
                  overflow: "hidden",

                  // position: "absolute",
                  // top: "0",
                  // left: "0",
                }}
              ></div>
            </div>

            <Stack direction="row" spacing={2}>
              <a download="test.jpg" href={baseImage}>
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
              </a>

              <Select placeholder=".PNG" w={24}>
                <option value="option1">.PNG</option>
                <option value="option2">.JPG</option>
              </Select>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}
