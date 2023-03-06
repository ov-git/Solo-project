"use client";
import { addDrinktoLibrary, createNewDrink } from "@/lib/api/UserApi";
import { useState } from "react";

const NewDrinkForm = () => {
  const [instructions, setInstructions] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "kcdsmcs9");
    formData.append("cloud_name", "dfd1y34pr");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dfd1y34pr/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    setImageUrl(data.url);
    // setImageUrl(
    //   "http://res.cloudinary.com/dfd1y34pr/image/upload/v1678065411/vm2rgj5d3dsvczjdjqe0.png"
    // );
    const res = await createNewDrink({
      name,
      instructions,
      image: imageUrl,
    });
    console.log(res);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full max-w-[800px] bg-red-200 p-8 rounded"
    >
      <h1>Create recepi</h1>
      <label className="pt-3">Name</label>
      <input onChange={(e) => setName(e.target.value)} />
      <label className="pt-3">Description</label>
      <textarea
        onChange={(e) => setInstructions(e.target.value)}
        className="max-h-[200px] min-h-[100px]"
        maxLength={600}
        wrap="soft"
      />
      <label className="pt-3">Add image:</label>
      <input
        type="file"
        onChange={(e) => {
          const image = e.target.files;
          if (image && image.length) {
            setImage(image[0]);
          }
        }}
      ></input>
      <button>Submit</button>
      <img src={imageUrl} height={200} width={200} alt="aaa" />
    </form>
  );
};

export default NewDrinkForm;
