import { ShortPostBlock, ShortPostModifier } from "../../data/Datastore/ModelsCommon/ShortPost/ShortPostTypes";



export function formatShortPostBody(blocks: ShortPostBlock[]): string {

  let result = "", firstPar = true;

  for (var { modifier, text, newPar } of blocks) {
    if (newPar) {
      if (firstPar) {
        firstPar = false;
      }
      else {
        result += "\n";
      }
    }
    switch (modifier) {
      case "txt": result += text + "\n"; break;
      case "b": result += "b: " + text + "\n"; break;
      case "vl": result += "vl: " + text + "\n"; break;
      case "wl": result += "wl: " + text + "\n"; break;
    }
  }
  return result;
}

export function checkSyntax(paragraph: string) {

  const lines = paragraph.split("\n").map(p => p.trim());

  for (var line of lines) {
    if (line) { // ignore empty lines
      if (line.startsWith("b:")) {
        const bulletText = line.substring(2).trim();
        if (! bulletText) {
          throw new Error("empty bullet text");
        }
      }
      else if (line.startsWith("vl:")) {
        parseVideoLink(line.substring(3).trim());
      }
      else if (line.startsWith("wl:")) {
        parseWebLink(line.substring(3).trim())
      }
    }
  }
}

export function parseShortPostBodyParagraph(paragraph: string): ShortPostBlock[] {

  const lines = paragraph.split("\n").map(p => p.trim());
  const result = [] as ShortPostBlock[];

  let modifier: ShortPostModifier, newPar = true;
  for (var line of lines) {
    console.log(line);
    if (line) { // ignore empty lines
      if (line.startsWith("b:")) {
        modifier = "b";
        line = JSON.stringify(line.substring(2).trim());
      }
      else if (line.startsWith("vl:")) {
        modifier = "vl";
        line = parseVideoLink(line.substring(3).trim());
//        line = _getJSONReady(line.substring(3).trim(), ['platform', 'videoId', 'startTimeInSeconds']);
      }
      else if (line.startsWith("wl:")) {
        modifier = "wl";
        line = parseWebLink(line.substring(3).trim())
//        line = _getJSONReady(line.substring(3).trim(), ['label', 'url']);
      }
      else {
        modifier = "txt";
      }
      result.push({ modifier, newPar, text: line });
      newPar = false;
    }
  }

  return result;
}

export function parseShortPostBody(text: string): ShortPostBlock[] {

  let result = [] as ShortPostBlock[];

  const paragraphs = text.split("\n\n").map(p => p.trim());

  for (var paragraph of paragraphs) {
    if (paragraph) {
      const parsedParagraph = parseShortPostBodyParagraph(paragraph);
      console.log("parsedParagraph", parsedParagraph)
      result = result.concat(parsedParagraph);
      console.log("result", result)
    }
  }
  return result;
}

export function _getJSONReady(s: string, keys: string[]) {
  let result = s;
  for (let key of keys) {
    result = result.replace(key, `\"${key}\"`);
  }
  return result;
}


function parseVideoLink(s: string) {
  let str, ob, videoId, startTimeInSeconds;
  try {
    str = parseKeyValueString(s);
    ob = JSON.parse(str);
    videoId = ob['videoId'];
    startTimeInSeconds = Number(ob['start']);
  }
  catch (e) {
    throw new Error(`cannot parse video link: ${s}`)
  }
  if (! videoId || ! startTimeInSeconds) {
    throw new Error(`while parsing video link ${s}: videoId and start must not be empty`);
  }
  else if (! Number.isInteger(startTimeInSeconds) ) {
      throw new Error(`while parsing video link ${s}: start must be an integer`)
  }
  return JSON.stringify({videoId, startTimeInSeconds})
}

function parseWebLink(s: string) {
  let str, ob, label, url;
  try {
    str = parseKeyValueString(s);
    ob = JSON.parse(str);
    label = ob['label'];
    url = ob['url'];
  }
  catch (e) {
    throw new Error(`cannot parse web link: ${s}`)
  }
  if (! url) {
    throw new Error(`while parsing web link: ${s}: url must not be empty`)
  }
  else if (! isValidUrl(url)) {
    throw new Error(`while parsing web link: ${s}: not a valid url: ${url}`)
  }
  return JSON.stringify({label, url})
}

function isValidUrl(urlString: string) {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
  return !!urlPattern.test(urlString);
}

function parseKeyValueString(str: string) {
  // Regular expression to match key-value pairs (updated)
  const regex = /({|\s*)(\w+):\s*(.*?)(?=\s*(,|}))/g;

  let result = '{'; // Start of the JSON object

  // Loop through all key-value pairs in the string
  let match;
  while ((match = regex.exec(str)) !== null) {
    const key = match[2]; // Extract the key
    const value = match[3]; // Extract the value (remove trailing comma/space)

    // Escape double quotes within the value for valid JSON
    const escapedValue = value.replace(/"/g, '\\"');

    // Add the key-value pair to the result string
    result += `"${key}": "${escapedValue}",`;
  }

  // Remove the trailing comma (if any)
  result = result.slice(0, -1);

  // Close the JSON object
  result += '}';

  return result;
}

// // Example usage
// const inputString = "{videoId: someVideoId, startTime: 12.5, anotherKey: 'someValue'}";
// const jsonString = parseKeyValueString(inputString);

// console.log(jsonString); // Output: {"videoId": "someVideoId", "startTime": 12.5, "anotherKey": "someValue"}
