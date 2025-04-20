/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, Param, Res, StreamableFile } from "@nestjs/common";
import { join } from "path";
import { createReadStream, promises as fs } from "fs";
import { Response } from "express";

@Controller("files")
export class FilesController {
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), "package.json"));
    return new StreamableFile(file);
  }
}
