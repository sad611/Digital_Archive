export const downloadFileFromServer = async (fileName: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/archivematica/files/${encodeURIComponent(fileName)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
  
      const blob = await response.blob();

      const contentDisposition = response.headers.get("Content-Disposition");
      let downloadFileName = fileName; 
  
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const fileNameMatch = contentDisposition.match(/filename="?([^"]+)"?/);
        if (fileNameMatch && fileNameMatch[1]) {
          downloadFileName = fileNameMatch[1];
        }
      }
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = downloadFileName;
      document.body.appendChild(anchor);
      anchor.click();
  
      // Clean up
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };
  