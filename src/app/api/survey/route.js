// app/api/survey/route.js
import { surveyData } from '../../../../data/survey';

export async function GET() {
  return new Response(JSON.stringify(surveyData), { status: 200 });
}
