import { cn } from './ui/utils';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const html = simpleMarkdownToHtml(content);

  return (
    <div
      className={cn('prose prose-sm max-w-none text-foreground [&_a]:text-primary [&_a]:hover:text-secondary [&_a]:underline [&_a]:underline-offset-2', className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function simpleMarkdownToHtml(md: string): string {
  let html = md
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  html = html
    .replace(/### (.+)/g, '<h3 class="text-base font-bold mt-4 mb-2 text-foreground">$1</h3>')
    .replace(/## (.+)/g, '<h2 class="text-lg font-bold mt-5 mb-2 text-foreground">$1</h2>')
    .replace(/# (.+)/g, '<h1 class="text-xl font-bold mt-6 mb-3 text-foreground">$1</h1>');

  html = html
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold"><em class="italic">$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
    .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded-md bg-muted/50 border border-border/30 text-xs font-mono">$1</code>');

  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    '<pre class="p-4 rounded-xl bg-muted/50 border border-border/50 overflow-x-auto my-3"><code class="text-xs font-mono leading-relaxed">$2</code></pre>'
  );

  html = html.replace(
    /^> (.+)/gm,
    '<blockquote class="border-l-2 border-primary/40 pl-4 py-1 my-2 text-sm text-muted-foreground italic">$1</blockquote>'
  );

  html = html.replace(/^- (.+)/gm, '<li class="flex items-start gap-2 text-sm mb-1"><span class="text-primary mt-1.5 size-1.5 rounded-full bg-primary shrink-0"></span><span>$1</span></li>');

  html = html.replace(/^\d+\. (.+)/gm, '<li class="flex items-start gap-2 text-sm mb-1 list-decimal ml-5"><span>$1</span></li>');

  html = html.replace(/---/g, '<hr class="my-6 border-border/50" />');

  html = html.replace(/\n{2,}/g, '</p><p class="mb-3 last:mb-0 leading-relaxed">');
  html = html.replace(/\n/g, '<br />');

  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-secondary underline underline-offset-2 transition-colors">$1</a>');

  html = html.replace(/(https?:\/\/[^\s<)]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-secondary underline underline-offset-2 transition-colors break-all">$1</a>');

  html = `<p class="mb-3 last:mb-0 leading-relaxed">${html}</p>`;

  html = html.replace(/<p class="mb-3 last:mb-0 leading-relaxed">\s*<\/p>/g, '');

  const listWrapped = html.replace(
    /(<li[^>]*>.*?<\/li>(\s*<li[^>]*>.*?<\/li>)*)/gs,
    (match) => {
      if (match.includes('list-decimal')) {
        return `<ol class="space-y-1 my-3">${match}</ol>`;
      }
      return `<ul class="space-y-1 my-3">${match}</ul>`;
    }
  );

  return listWrapped;
}
