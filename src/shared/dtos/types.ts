import { Platform } from "src/auth/dto/types";

type RequestWithAuthenticatedEmployee = Request & {
    auth: {
      employee: string;
      platform: Platform;
      token: string;
    };
}

class RequestWithPlatformHeader extends Request {
  headers: HeaderWithPlatform;
}

type HeaderWithPlatform = Headers & {
  platform: Platform;
}

export {
  RequestWithAuthenticatedEmployee,
  RequestWithPlatformHeader,
}