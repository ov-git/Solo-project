import Image, { StaticImageData } from "next/image";
import { SetStateAction, useState } from "react";
import defaultUserImage from "../../../public/defaultUserImage.png";

type Props = {
  setDrinkImageUrl: React.Dispatch<SetStateAction<string>>;
};

const Page3 = ({ setDrinkImageUrl }: Props) => {
  const [image, setImage] = useState<string | Blob | null>(null);
  const [imageSelected, setImageSelected] = useState<StaticImageData | string>(
    defaultUserImage
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append("file", image);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_IMAGE_STORAGE_PRESET as string
    );
    formData.append(
      "cloud_name",
      process.env.NEXT_PUBLIC_IMAGE_STORAGE_CLOUDNAME as string
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_IMAGE_STORAGE_URL as string,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    setDrinkImageUrl(data.url);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-around h-full"
    >
      <div className="flex w-full gap-8">
        <Image
          alt="drinkImage"
          src={imageSelected}
          className="w-48 h-48 rounded"
          width={200}
          height={200}
        />

        <p>Please only upload high quality .png or .jpg images</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="pt-3">Select image file:</label>
        <input
          type="file"
          accept=".jpg, jpeg, .png"
          onChange={(e) => {
            const image = e.target.files;
            if (image && image.length) {
              setImage(image[0]);
              const show = URL.createObjectURL(image[0]);
              setImageSelected(show);
            }
          }}
        />
        <button
          disabled={imageSelected === defaultUserImage}
          className="w-24 ml-auto text-white rounded-lg bg-dDarkOrange disabled:bg-gray-500"
        >
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Page3;
