/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { HttpException, Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom, map } from "rxjs";

@Injectable()
export class ArchivematicaService {
  private readonly apiBase = "http://am:62080/api";
  private readonly username = "test";
  private readonly apiKey = "81b4720c2dd32f19b3d972b9519ce0f4c94d5710";

  constructor(private readonly httpService: HttpService) {}

  private authQuery(): string {
    const query = `?username=${this.username}&api_key=${this.apiKey}`;
    console.log("Generated auth query:", query);
    return query;
  }

  async startTransfera(transferData: any) {
    const url = `${this.apiBase}/transfer/start_transfer/`;
    console.log("Starting transfer...");
    console.log("Request URL:", url);
    console.log("Request Body:", JSON.stringify(transferData, null, 2));

    const headers = {
      Authorization: `ApiKey ${this.username}:${this.apiKey}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(url, transferData, { headers }).pipe(
          map((res) => {
            console.log("Start Transfer Response:", res.data);
            return res.data;
          }),
          catchError((err) => {
            console.error("Error response:", err.response?.data || err.message);
            throw new HttpException(
              err.response?.data || err.message,
              err.response?.status || 500,
            );
          }),
        ),
      );
      console.log("Transfer started successfully:", response);
      return response;
    } catch (error) {
      console.error("Transfer failed:", error);
      throw error;
    }
  }

  async getUnapprovedTransfers() {
    const url = `${this.apiBase}/transfer/unapproved`;
    console.log("Fetching unapproved transfers from URL:", url);

    const headers = {
      Authorization: `ApiKey ${this.username}:${this.apiKey}`,
    };

    return firstValueFrom(
      this.httpService.get(url, { headers }).pipe(
        map((res) => {
          console.log("Received unapproved transfers response:", res.data);
          return res.data;
        }),
        catchError((err) => {
          console.error("Error fetching unapproved transfers:", err);
          throw new HttpException(
            err.response?.data || err.message,
            err.response?.status || 500,
          );
        }),
      ),
    );
  }
  async approveTransfer(name: string) {
    const url = `${this.apiBase}/transfer/approve/${this.authQuery()}`;
    console.log("Approving transfer with name:", name, "at URL:", url);
    return firstValueFrom(
      this.httpService.post(url, { name }).pipe(
        map((res) => {
          console.log("Received approve transfer response:", res.data);
          return res.data;
        }),
        catchError((err) => {
          console.error("Error approving transfer:", err);
          throw new HttpException(
            err.response?.data || err.message,
            err.response?.status || 500,
          );
        }),
      ),
    );
  }

  async startTransfer(transferData: any) {
    const url = `${this.apiBase}/transfer/start_transfer/${this.authQuery()}`;
    console.log("Starting transfer with data:", transferData, "at URL:", url);
    return firstValueFrom(
      this.httpService.post(url, transferData).pipe(
        map((res) => {
          console.log("Received start transfer response:", res.data);
          return res.data;
        }),
        catchError((err) => {
          console.error("Error starting transfer:", err);
          throw new HttpException(
            err.response?.data || err.message,
            err.response?.status || 500,
          );
        }),
      ),
    );
  }

  async getTransferStatus(uuid: string) {
    const url = `${this.apiBase}/transfer/status/${uuid}/${this.authQuery()}`;
    console.log("Fetching transfer status for UUID:", uuid, "from URL:", url);
    return firstValueFrom(
      this.httpService.get(url).pipe(
        map((res) => {
          console.log("Received transfer status response:", res.data);
          return res.data;
        }),
        catchError((err) => {
          console.error("Error fetching transfer status:", err);
          throw new HttpException(
            err.response?.data || err.message,
            err.response?.status || 500,
          );
        }),
      ),
    );
  }

  async getIngestStatus(uuid: string) {
    const url = `${this.apiBase}/ingest/status/${uuid}/${this.authQuery()}`;
    console.log("Fetching ingest status for UUID:", uuid, "from URL:", url);
    return firstValueFrom(
      this.httpService.get(url).pipe(
        map((res) => {
          console.log("Received ingest status response:", res.data);
          return res.data;
        }),
        catchError((err) => {
          console.error("Error fetching ingest status:", err);
          throw new HttpException(
            err.response?.data || err.message,
            err.response?.status || 500,
          );
        }),
      ),
    );
  }
}
