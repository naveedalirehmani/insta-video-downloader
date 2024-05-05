import React, { useState, useTransition } from "react";

function useFetch() {
  const [isPending, startTransition] = useTransition();
  const [formats, setFormats] = useState<any>();

  const fetchUrl = async (values: any) => {
    try {
      startTransition(async () => {
        try {
          const response = await fetch("/api", {
            method: "POST",
            body: JSON.stringify({ url: values.postUrl }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const data = await response.json();
          if (data?.message) {
            // Instead of alerting, consider setting a state to display the message
            console.log(data.message);
          }
          setFormats(data.data);
        } catch (error) {
          console.error("Error parsing response:", error);
        }
      });
    } catch (error) {
      console.error("Error fetching video information:", error);
    }
  };

  return {
    formats,
    isPending,
    fetchUrl,
  };
}

export default useFetch;
