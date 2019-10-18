export const fetchSVGXMLData = async (svgPath: string) => {
  const svgRequest = await fetch(svgPath);

  return await svgRequest.text();
};
