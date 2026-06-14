const publicUrl = process.env.PUBLIC_URL || "";

export const publicPath = path => `${publicUrl}${path}`;
