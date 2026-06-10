type ReservationQRCodeDTO = {
  reservationId: number;
  event: EventLight;
  seats: SeatFull[];
  statusPresence: string;
  qrCodeBase64: string;
}

