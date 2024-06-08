const uploadProduct = async (files) => {
    const responses = [];
  
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "oqhwwpdf");
      formData.append("cloud_name", "dlnkiwqfa");
  
      try {
        const response = await fetch("https://api.cloudinary.com/v1_1/dlnkiwqfa/image/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const data = await response.json();
          responses.push({ secure_url: data.secure_url, public_id: data.public_id });
        } else {
          console.error("Error uploading image:", response.statusText);
          responses.push(null);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        responses.push(null);
      }
    }
  
    return responses;
  };
  
  export default uploadProduct;
  