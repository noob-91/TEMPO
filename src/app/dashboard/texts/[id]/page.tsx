import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import DashboardNavbar from "@/components/dashboard-navbar";
import AnnotationInterface from "@/components/text-annotation/annotation-interface";

// Mock data for a sample text
const sampleText = {
  id: "digest-41-3-4",
  title: "Digest 41.3.4: On Usucaption and Long Possession",
  author: "Justinian",
  date: "533 CE",
  content: `Usucapio est adiectio dominii per continuationem possessionis temporis lege definiti. Usucapio rerum etiam ex aliis causis concessa interim propter ea, quae nostra existimantes possideremus, constituta est, ut aliquis litium finis esset. 

Sine possessione usucapio contingere non potest. Usucapio est adeptio dominii per continuationem possessionis anni vel biennii: rerum mobilium anni, immobilium biennii.

Eum, qui aedes mercatus est, non puto aliud quam ipsas aedes possidere: nam si singulas res possidere intellegetur, ipsas non possidebit: separatis enim corporibus, ex quibus aedes constant, universitas aedium intellegi non poterit. 

Accedit eo, quod, si quis singularum rerum possessionem tradere ei voluerit, necesse erit tradere ut quidque separatum fuerit: at quod universum corpus aedium possidere et accipere debet, pro traditione singularum rerum utimur.

Quod autem solo continetur, item corporis fundi est, et ideo, si aedes dirutae sint, negotium perfectum est, non est his simile: non enim recipit haec res condicionem.`,
  annotations: [
    {
      id: "annotation-1",
      type: "deletion",
      startIndex: 120,
      endIndex: 180,
      text: "Usucapio rerum etiam ex aliis causis concessa interim propter ea",
      confidence: "high",
      scholar: {
        id: "scholar-1",
        name: "Prof. Maria Johnson",
        institution: "University of Oxford",
      },
      justification:
        "This passage shows clear linguistic anachronisms and doesn't appear in earlier manuscripts. The style is inconsistent with classical juristic writing.",
      createdAt: "2023-10-15T14:30:00Z",
      upvotes: 12,
      downvotes: 2,
    },
    {
      id: "annotation-2",
      type: "insertion",
      startIndex: 250,
      endIndex: 290,
      text: "Sine possessione usucapio contingere non potest",
      confidence: "medium",
      scholar: {
        id: "scholar-2",
        name: "Dr. Robert Smith",
        institution: "Harvard University",
      },
      justification:
        "This appears to be a post-classical clarification added during Justinian's compilation. The phrasing is simpler than the surrounding text and states what was already implied.",
      createdAt: "2023-11-02T09:15:00Z",
      upvotes: 8,
      downvotes: 3,
    },
    {
      id: "annotation-3",
      type: "suspect",
      startIndex: 400,
      endIndex: 470,
      text: "Eum, qui aedes mercatus est, non puto aliud quam ipsas aedes possidere",
      confidence: "review",
      scholar: {
        id: "scholar-3",
        name: "Prof. James Wilson",
        institution: "University of Berlin",
      },
      justification:
        "The terminology is questionable for the classical period. While not definitively an interpolation, the conceptual framework seems more developed than what we would expect from earlier jurists.",
      createdAt: "2023-12-05T16:45:00Z",
      upvotes: 5,
      downvotes: 4,
    },
  ],
};

export default async function TextPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // In a real application, you would fetch the text and annotations from the database
  // const { data: text } = await supabase.from('texts').select('*').eq('id', params.id).single();
  // const { data: annotations } = await supabase.from('annotations').select('*').eq('text_id', params.id);

  // Using mock data for now
  const text = sampleText;

  // Mock current user data
  const currentUser = {
    id: user.id,
    name: user.user_metadata?.full_name || "Scholar",
    institution: user.user_metadata?.institution || "Academic Institution",
  };

  return (
    <>
      <DashboardNavbar />
      <main className="flex flex-col h-[calc(100vh-65px)]">
        <AnnotationInterface
          textId={text.id}
          textTitle={text.title}
          textAuthor={text.author}
          textDate={text.date}
          textContent={text.content}
          initialAnnotations={text.annotations}
          currentUser={currentUser}
        />
      </main>
    </>
  );
}
