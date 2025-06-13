import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router";
import Header from "./layouts/Header";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import apiClient from "@/api/apiClient";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const TutorCertificationsPage = () => {
  const navigate = useNavigate();

  // const [index, setIndex] = useState(0);
  const [certName, setCertName] = useState("");
  const [certDesc, setCertDesc] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedSkillName, setSelectedSkillName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showingImage, setShowingImage] = useState<string | null>(null);

  const [certifications, setCertifications] = useState([]);

  useEffect(() => {
    const getCerts = async () => {
      const result = await apiClient.get("/tutor/certs");
      console.log(result.data.data);
      setCertifications(result.data.data);
    };
    getCerts();
  }, []);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await apiClient.get("/tutor/skills");
        setSkills(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSkills();
  }, []);

  const handleOnChangeCertName = (e) => {
    setCertName(e.target.value);
  };

  const handleOnChangeCertDesc = (e) => {
    setCertDesc(e.target.value);
  };

  const handleSubmitCert = async () => {
    const formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("certName", certName);
    formData.append("certDesc", certDesc);
    formData.append("skillId", selectedSkill);

    // const body = {
    //   certName: certName,
    //   certDesc: certDesc,
    //   selectedImage: selectedImage,
    // };
    const result = await apiClient.post("/tutor/certs", formData);
    console.log(result.data.result);
    setCertifications([...certifications, result.data.result]);
  };

  const handleDeleteCert = async (_id) => {
    console.log(_id);
    setCertifications(certifications.filter((e) => e._id !== _id));
    const result = await apiClient.delete(`/tutor/certs/${_id}`);
  };

  const handleSelectSkill = (e) => {
    console.log(e);
    const curr = skills.find((element) => element._id === e);
    setSelectedSkill(e);
    setSelectedSkillName(curr.name);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      {/* Main Content */}
      <div className="flex flex-1 flex-col justify-start items-center bg-gray-50">
        <Button
          className="bg-[#358EDD] border-0 p-2.5 cursor-pointer text-white mx-2"
          onClick={() => {
            navigate("/tutor/dashboard");
          }}
        >
          Back
        </Button>
        <div className="w-[40%] p-8 flex flex-col gap-6 justify-center">
          <div className="text-2xl font-semibold">Your certifications</div>
          <div className="text-sm text-muted-foreground "></div>

          <div className="flex flex-col bg-white rounded-lg p-6 gap-6">
            <div className="w-full flex flex-col gap-2">
              <Label className="text-base font-medium" htmlFor="skill-name">
                Certification for
              </Label>
              <Input
                placeholder="e.g. IELTS 7.0"
                name="skill-name"
                // type="number"
                value={certName}
                onChange={handleOnChangeCertName}
              />
              <Label className="text-base font-medium" htmlFor="skill-name">
                Description
              </Label>
              <Input
                placeholder="e.g. Listening 6.5 etc"
                name="skill-name"
                // type="number"
                value={certDesc}
                onChange={handleOnChangeCertDesc}
              />
              <Label className="text-base font-medium" htmlFor="skill-name">
                Image
              </Label>
              <Input
                placeholder="e.g. Listening 6.5 etc"
                name="skill-name"
                type="file"
                onChange={(event) => {
                  console.log(event.target.files[0]); // Log the selected file
                  setSelectedImage(event.target.files[0]); // Update the state with the selected file
                }}
                // value={hourlyRate}
                // onChange={handleOnChangeRate}
              />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedSkillName ? selectedSkillName : "Select Skill"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuRadioGroup
                    value={selectedSkill}
                    onValueChange={handleSelectSkill}
                  >
                    {" "}
                    {skills.map((skill) => (
                      <DropdownMenuRadioItem value={skill._id}>
                        {skill.name}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Carousel>
              <CarouselContent>
                <CarouselItem></CarouselItem>
              </CarouselContent>
            </Carousel>
            <div className="w-full flex flex-col gap-2">
              {/* <Label
                className="text-base font-medium"
                htmlFor="skill-description"
              >
                Description
              </Label> */}
              {/* <Textarea
                rows={5}
                placeholder="Describe what you'll teach, your approach, curriculum, and expected outcomes"
                name="skill-description"
                value={description}
                onChange={handleOnChangeDescription}
              /> */}
            </div>

            <Button
              className="w-[40%] self-center flex flex-row gap-2"
              onClick={handleSubmitCert}
            >
              {/* <Plus size={16} /> */}
              Update
            </Button>
          </div>
          {certifications.map((cert) => (
            <div
              key={cert._id}
              className="min-w-[200px] bg-white rounded-xl shadow p-4 flex-shrink-0"
            >
              <h3 className="font-semibold text-sm mb-1">{cert.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">
                {cert.description}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {cert?.skill?.name}
              </p>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-xs"
                    onClick={() => setShowingImage(cert.imageUrl)}
                  >
                    View Image
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <img
                    src={showingImage ?? ""}
                    alt="Certification"
                    className="w-full h-auto rounded"
                  />
                </DialogContent>
              </Dialog>
              <Button
                variant="outline"
                className="text-xs"
                onClick={() => {
                  handleDeleteCert(cert._id);
                }}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorCertificationsPage;
