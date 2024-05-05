import axios from "axios";
import { useState, useTransition } from "react";

type DownloadStatus = "started" | "finished" | "failed";

type DownloadHookProps = {
  formats: { videoUrl: string; filename: string };
};

const useDownload = ({ formats }: DownloadHookProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [downloadStatus, setDownloadStatus] =
    useState<DownloadStatus>("finished");
  const [sheetOpen, setSheetOpen] = useTransition();

  const startDownload = () => {
    setDownloadStatus("started");
    setSheetOpen(async () => {
      try {
        const encodedUrl = encodeURIComponent(formats.videoUrl);
        const response = await axios.get(`/api/download?url=${encodedUrl}`, {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            //@ts-ignore
            const percentCompleted = Math.round((loaded * 100) / total);
            setProgress(percentCompleted);
          },
        });

        const urlObject = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = urlObject;
        link.download = formats.filename + ".mp4";
        document.body.appendChild(link);
        link.click();

        window.URL.revokeObjectURL(urlObject);
        document.body.removeChild(link);

        setProgress(0);
        setDownloadStatus("finished");
      } catch (error) {
        console.error("Error downloading file:", error);
        setProgress(0);
        setDownloadStatus("failed");
      }
    });
  };

  return { progress, downloadStatus, sheetOpen, startDownload };
};

export default useDownload;
