import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Cropper from "react-cropper";
import { Icon, Stack, Button, Select, Accordion } from "@chakra-ui/react";
import { HiUpload, HiDownload } from "react-icons/hi";
import { FiCrop } from "react-icons/fi";
import { BsArrowsMove } from "react-icons/bs";

import ContentWrapper from "../components/ContentWrapper";
import ImageSelector from "../components/ImageSelector";
import ActionButton from "../components/ActionButton";
import AccordionSection from "../components/AccordionSection";
import Checkbox from "../components/Checkbox";
import CropScore from "../components/CropScore";

import "cropperjs/dist/cropper.css";
import styles from "../styles/Home.module.css";

import { presets } from "../data/presets.js";

export default function Home() {
  // img src https://www.peakpx.com/

  const initialSite = Object.keys(presets[0])[0];
  const { name, description, height, width } = presets[0][initialSite][0];

  const [image, setImage] = useState();
  // const [cropData, setCropData] = useState();
  const [baseImage, setBaseImage] = useState("");
  const [cropper, setCropper] = useState();

  const [activePreset, setActivePreset] = useState({
    site: initialSite,
    name,
    description,
    height,
    width,
  });
  const [fileType, setFileType] = useState("jpg");

  const [isDragActive, setIsDragActive] = useState(true);
  const [dragArea, setDragArea] = useState({
    width: 0,
    height: 0,
  });

  const calcCustomRes = (res) =>
    res < 720 ? "SD" : res < 1920 ? "HD" : res < 3840 ? "FHD" : "UHD";

  const cropperRef = useRef(null);
  const onCrop = () => {
    let imageElement =
      cropperRef === null || cropperRef === 0 ? 0 : cropperRef.current;
    let cropper =
      imageElement === null || imageElement === 0 ? 0 : imageElement.cropper;
    setDragArea({
      ...dragArea,
      width: cropper.getCroppedCanvas().width,
      height: cropper.getCroppedCanvas().height,
    });

    setBaseImage(cropper.getCroppedCanvas().toDataURL());
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

  const zoomIn = () => cropper.zoom(0.1);
  const zoomOut = () => cropper.zoom(-0.1);
  const moveLeft = () => cropper.move(-10, 0);
  const moveRight = () => cropper.move(10, 0);
  const moveUp = () => cropper.move(0, -10);
  const moveDown = () => cropper.move(0, 10);
  const rotateLeft = () => cropper.rotate(-45);
  const rotateRight = () => cropper.rotate(45);
  const swapX = () =>
    cropper.getData().scaleX === 1 ? cropper.scaleX(-1) : cropper.scaleX(1);
  const swapY = () =>
    cropper.getData().scaleY === 1 ? cropper.scaleY(-1) : cropper.scaleY(1);

  const reset = () => cropper.reset();

  return (
    <div>
      <Head>
        <title>CropScore: An Online Image Cropper for Content Creators</title>
        <meta
          name="description"
          content="An Online Image Cropper for Content Creators"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!image ? (
        <ContentWrapper>
          <div className={styles.heroArea}>
            <h1 className={styles.heroTitle}>
              An image cropper for content creators
            </h1>
            <p className={styles.heroSubTitle}>
              Resolutions and aspect ratios should be the last things you worry
              about.
            </p>

            <div className={styles.heroSelect}>
              <div>
                <p>
                  {" "}
                  Say goodbye to out of positioned, stretched, pixelated, etc
                  images
                </p>
                <p>
                  Stop spending time on trying to figure out the resolutions and
                  aspect ratios
                </p>
              </div>
              <div className={styles.imageSelectorArea}>
                <ImageSelector onChange={onChange} />
              </div>
            </div>
          </div>
        </ContentWrapper>
      ) : (
        <div className={styles.creatorArea}>
          <div className={styles.presets}>
            <Accordion defaultIndex={[0]} allowToggle>
              {presets.map((site, i) => {
                return (
                  <AccordionSection key={i} title={Object.keys(site)}>
                    {site[Object.keys(site)].map((param, index) => {
                      return (
                        <Checkbox
                          key={index}
                          index={!i && !index}
                          title={param.name}
                          isChecked={
                            activePreset.site
                              ? activePreset.site.toString() ==
                                  Object.keys(site).toString() &&
                                activePreset.name == param.name
                              : false
                          }
                          onChange={(e) => {
                            if (e.target.checked) {
                              setActivePreset({
                                ...activePreset,
                                site: Object.keys(site),
                                name: param.name,
                                description: param.description,
                                height: param.height,
                                width: param.width,
                              });
                              cropper.setAspectRatio(
                                param.width / param.height
                              );
                            } else {
                              setActivePreset({});
                              cropper.setAspectRatio(NaN);
                            }
                          }}
                        />
                      );
                    })}
                  </AccordionSection>
                );
              })}
            </Accordion>
          </div>

          <div
            style={{
              margin: "0 auto",
            }}
          >
            <Cropper
              src={image}
              style={{ height: "480px", width: "100%" }}
              aspectRatio={1600 / 840}
              guides={true}
              preview=".preview"
              crop={onCrop}
              ref={cropperRef}
              disable={false}
              autoCropArea={1} //0.8 is default
              background={false}
              viewMode={2}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <div className={styles.controls}>
              <Button
                onClick={() => {
                  cropper.setDragMode("crop");
                  setIsDragActive(true);
                }}
                leftIcon={<Icon as={FiCrop} w={5} h={5} />}
                colorScheme="orange"
                variant="solid"
                isActive={isDragActive}
              >
                Draw
              </Button>
              <Button
                onClick={() => {
                  cropper.setDragMode("move");
                  setIsDragActive(false);
                  console.log(cropper);
                }}
                leftIcon={<Icon as={BsArrowsMove} w={5} h={5} />}
                colorScheme="orange"
                variant="solid"
                isActive={!isDragActive}
              >
                Move
              </Button>

              <ActionButton
                onClick={zoomIn}
                icon={BsArrowsMove}
                color="teal"
                title="Zoom in"
              />
              <ActionButton
                onClick={zoomOut}
                icon={BsArrowsMove}
                color="teal"
                title="Zoom out"
              />
              <ActionButton
                onClick={moveLeft}
                icon={BsArrowsMove}
                color="teal"
                title="Move left"
              />
              <ActionButton
                onClick={moveRight}
                icon={BsArrowsMove}
                color="teal"
                title="Move right"
              />
              <ActionButton
                onClick={moveUp}
                icon={BsArrowsMove}
                color="teal"
                title="Move up"
              />
              <ActionButton
                onClick={moveDown}
                icon={BsArrowsMove}
                color="teal"
                title="Move Down"
              />
              <ActionButton
                onClick={rotateLeft}
                icon={BsArrowsMove}
                color="teal"
                title="Rotate left"
              />
              <ActionButton
                onClick={rotateRight}
                icon={BsArrowsMove}
                color="teal"
                title="Rotate right"
              />
              <ActionButton
                onClick={swapX}
                icon={BsArrowsMove}
                color="teal"
                title="Flip X axis"
              />
              <ActionButton
                onClick={swapY}
                icon={BsArrowsMove}
                color="teal"
                title="Flip Y axis"
              />
              <ActionButton
                onClick={reset}
                icon={BsArrowsMove}
                color="red"
                title="Reset crop"
              />
            </div>
          </div>

          <div className={styles.tools}>
            <div className={styles.titleBox}>
              {activePreset.site ? (
                <h1 className={styles.sectionTitle}>
                  {activePreset.site} {activePreset.name}
                </h1>
              ) : (
                <h1 className={styles.sectionTitle}>Custom Resolution:</h1>
              )}
            </div>
            <div className={styles.descriptionBox}>
              {activePreset.site ? (
                <p>{activePreset.description}</p>
              ) : (
                <p>Draw any crop area you want</p>
              )}
            </div>

            <div className={styles.titleBox}>
              <h1 className={styles.sectionTitle}>Cropped Data:</h1>
            </div>

            <div className={styles.croppedInfo}>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div>
                  <h1 className={styles.croppedRes}>{dragArea.width}</h1>
                  <p>Width</p>
                </div>
              </div>
              <div style={{ display: "grid", placeItems: "center" }}>
                <h1>X</h1>
              </div>
              <div style={{ display: "grid", placeItems: "center" }}>
                <div>
                  <h1 className={styles.croppedRes}>{dragArea.height}</h1>
                  <p>Height</p>
                </div>
              </div>
              <div>
                {/* <p>Res.score</p> */}
                {activePreset.width ? (
                  // <h1 className={styles.croppedRes}>
                  //   {Math.round((dragArea.width * 100) / activePreset.width)} %
                  // </h1>
                  <CropScore
                    score={Math.round(
                      (dragArea.width * 100) / activePreset.width
                    )}
                    value={Math.round(
                      (dragArea.width * 100) / activePreset.width
                    )}
                  />
                ) : (
                  <div>
                    <p>Res.score</p>
                    <h1 className={styles.croppedRes}>
                      {calcCustomRes(Math.round(dragArea.width))}
                    </h1>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.titleBox}>
              <h1 className={styles.sectionTitle}>Image Preview:</h1>
            </div>

            <div
              style={{
                height: "auto",
                width: "100%",
                position: "relative",
                marginBottom: "20px",
              }}
            >
              <div
                className="preview"
                style={{
                  height: "200px",
                  overflow: "hidden",
                }}
              ></div>
            </div>

            <Stack direction="row" spacing={2}>
              <a download={`test.${fileType}`} href={baseImage}>
                <Button
                  onClick={() => {
                    cropper.getCroppedCanvas({
                      width: "90px",
                      height: "90px",
                    });
                  }}
                  rightIcon={<Icon as={HiDownload} w={5} h={5} />}
                  colorScheme="teal"
                  variant="solid"
                  w={150}
                >
                  Download
                </Button>
              </a>

              <Select
                w={24}
                onChange={(e) => {
                  setFileType(e.target.value);
                }}
              >
                <option value="jpg">.JPG</option>
                <option value="png">.PNG</option>
              </Select>
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
}
