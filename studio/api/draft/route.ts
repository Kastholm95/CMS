import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

import { client } from "@/studio/lib/client";
const token = "skesDcSwMEZMTyq1H1V8lTgvWJFpSzQICGyQCp5rJWsxUj3VqURkK9gOI5hFTVRDplJzsyXODVc1giGSdeKRkJ0bye5Z9kwFfLmG71smIa8oYACryptgansWNNQSFb5niQHpjV7oNddgrverYyeSiG2CSk5HCO7KGkGsR6WQcLoXo85fabk7"


const clientWithToken = client.withConfig({ token });

export async function GET(request: Request) {
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  draftMode().enable();

  redirect(redirectTo);
}