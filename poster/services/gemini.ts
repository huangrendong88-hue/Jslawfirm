
import { GoogleGenAI } from "@google/genai";

/**
 * 调用 Gemini 2.5 Flash Image 模型生成背景图
 * @param prompt 提示词，描述想要生成的画面内容
 */
export const generateBackgroundImage = async (prompt: string): Promise<string | null> => {
  try {
    // 初始化 AI 实例，apiKey 从环境变量中安全获取
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // 调用 generateContent 接口
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // 使用专门的图像生成/编辑模型
      contents: {
        parts: [
          {
            // 组合提示词：基础要求（极简、高质量、音乐主题）+ 随机的主题描述
            text: `A professional, high-quality, minimalist vertical background for a music social media poster. 
                   Warm color palette (golden hour, soft oranges, muted yellows, warm browns). 
                   Subject: ${prompt}. 
                   Style: Artistic, soft focus, bokeh, elegant, clean composition, 9:16 aspect ratio. 
                   No text, no watermarks.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "9:16" // 强制要求 9:16 的比例，适配视频号封面
        }
      }
    });

    // 遍历响应结果，寻找包含 inlineData (Base64图片数据) 的部分
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        // 返回标准的 Base64 图片 Data URL，可直接赋值给 img 标签的 src
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("生成背景图失败:", error);
    return null;
  }
};
