export const postService = {
  async scheduleFacebookPost(accessToken, pageId, message, scheduledAt) {
    const apiUrl = `https://graph.facebook.com/v12.0/${pageId}/feed`;

    const response = await axios.post(apiUrl, {
      message,
      published: false,
      scheduled_publish_time: Math.floor(
        new Date(scheduledAt).getTime() / 1000
      ),
      access_token: accessToken,
    });

    return response.data;
  },
};

import axios from "axios";
