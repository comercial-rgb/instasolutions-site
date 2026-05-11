import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Briefcase, ChevronDown, MapPin } from 'lucide-react';
import { SEOHead } from '../components/ui/SEOHead';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';
import { COLORS, DOMAIN, EMAIL, UFS } from '../lib/constants';
import type { Language, TranslationKey } from '../lib/translations';
import { maskPhoneBR } from '../lib/formUtils';
import { candidaturaSchema, type CandidaturaFormData } from '../lib/validators';
import { getActiveJobs, getJobById, pickLocalized, VAGAS_PAGE, type JobOpening } from '../lib/vagasContent';

const MAX_CV_BYTES = 5 * 1024 * 1024;

export default function VagasPage() {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToast } = useToast();
  const startTime = React.useRef(Date.now());
  const fileRef = React.useRef<HTMLInputElement>(null);
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const vagas = getActiveJobs();
  const heroSrc = VAGAS_PAGE.heroImageSrc.trim();
  const heroAlt = pickLocalized({ pt: VAGAS_PAGE.heroImageAlt.pt, en: VAGAS_PAGE.heroImageAlt.en }, language);

  const ogImageAbsolute = React.useMemo(() => {
    if (!heroSrc) return undefined;
    if (heroSrc.startsWith('http')) return heroSrc;
    const path = heroSrc.startsWith('/') ? heroSrc : `/${heroSrc}`;
    return `${DOMAIN}${path}`;
  }, [heroSrc]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CandidaturaFormData>({
    resolver: zodResolver(candidaturaSchema),
    defaultValues: { vagaId: '' },
  });

  const vagaWatch = watch('vagaId');
  const celularField = register('celular');

  React.useEffect(() => {
    const slug = searchParams.get('vaga');
    if (slug && getJobById(slug)) {
      setValue('vagaId', slug, { shouldValidate: true });
    }
  }, [searchParams, setValue]);

  const roleOptions = React.useMemo(() => {
    const opts = vagas.map((j) => ({
      value: j.id,
      label: pickLocalized(j.title, language),
    }));
    return [{ value: '', label: t('jobs.chooseRole') }, ...opts];
  }, [vagas, language, t]);

  function scrollToApply(slug: string) {
    setValue('vagaId', slug, { shouldValidate: true });
    setSearchParams({ vaga: slug });
    window.requestAnimationFrame(() => {
      document.getElementById('candidatura')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  async function onSubmit(data: CandidaturaFormData) {
    if (Date.now() - startTime.current < 3000) return;
    if (data.website) return;

    const fileInput = fileRef.current;
    const file = fileInput?.files?.[0];
    if (file) {
      if (file.size > MAX_CV_BYTES) {
        addToast('error', t('jobs.errorFileSize'));
        return;
      }
      const okType = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      if (!okType) {
        addToast('error', t('jobs.errorFileType'));
        return;
      }
    }

    const job = getJobById(data.vagaId);
    const jobTitle = job ? pickLocalized(job.title, language) : data.vagaId;

    const fd = new FormData();
    fd.append('_subject', `[Site] Candidatura — ${jobTitle}`);
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');
    fd.append('idiomaPreferido', language);
    fd.append('nomeCompleto', data.nomeCompleto);
    fd.append('email', data.email);
    fd.append('celular', data.celular);
    fd.append('vagaId', data.vagaId);
    fd.append('vagaTitulo', jobTitle);
    if (data.estado?.trim()) fd.append('estado', data.estado);
    if (data.cidade?.trim()) fd.append('cidade', data.cidade);
    if (data.linkedin?.trim()) fd.append('linkedin', data.linkedin.trim());
    if (data.portfolioUrl?.trim()) fd.append('portfolioUrl', data.portfolioUrl.trim());
    fd.append('mensagem', data.mensagem);
    if (file) fd.append('attachment', file, file.name);

    try {
      await fetch(`https://formsubmit.co/${EMAIL}`, { method: 'POST', body: fd });
      if (fileInput) fileInput.value = '';
      navigate('/obrigado');
    } catch {
      addToast('error', t('jobs.errorSend'));
    }
  }

  return (
    <>
      <SEOHead
        title={t('jobs.seoTitle')}
        description={t('jobs.seoDescription')}
        canonical={`${DOMAIN}/vagas`}
        ogImage={ogImageAbsolute}
        htmlLang={language === 'en' ? 'en' : 'pt-BR'}
        ogLocale={language === 'en' ? 'en_US' : 'pt_BR'}
        ogLocaleAlternate={language === 'en' ? 'pt_BR' : 'en_US'}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {heroSrc ? (
          <header className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-14 lg:mb-16">
            <CareersHeroVisual src={heroSrc} alt={heroAlt} />
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-4xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
                {t('jobs.title')}
              </h1>
              <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t('jobs.subtitle')}
              </p>
            </div>
          </header>
        ) : (
          <header className="mb-12 lg:mb-14">
            <h1 className="text-2xl sm:text-4xl font-bold text-center mb-3" style={{ color: COLORS.azulCorp }}>
              {t('jobs.title')}
            </h1>
            <p className="text-center text-neutral-600 max-w-2xl mx-auto leading-relaxed">{t('jobs.subtitle')}</p>
          </header>
        )}
        {vagas.length === 0 ? (
          <p className="text-center text-neutral-500 py-16">{t('jobs.none')}</p>
        ) : (
          <>
            <h2 className="text-lg font-semibold mb-6" style={{ color: COLORS.azulCorp }}>
              {t('jobs.sectionOpenings')}
            </h2>
            <div className="grid gap-8 lg:gap-10 mb-16">
            {vagas.map((job) => (
              <JobOpeningCard
                key={job.id}
                job={job}
                language={language}
                expanded={expandedId === job.id}
                onToggle={() => setExpandedId((id) => (id === job.id ? null : job.id))}
                onApply={() => scrollToApply(job.id)}
                t={t}
              />
            ))}
            </div>
          </>
        )}

        <section
          id="candidatura"
          className="scroll-mt-28 rounded-3xl border p-6 sm:p-10"
          style={{ borderColor: COLORS.borderPill, backgroundColor: COLORS.bgPill }}
          aria-labelledby="candidatura-heading"
        >
          <h2 id="candidatura-heading" className="text-xl sm:text-2xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>
            {t('jobs.sectionApply')}
          </h2>
          <p className="text-sm text-neutral-600 mb-6">{t('jobs.applyHint')}</p>

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 max-w-3xl" noValidate>
            <input
              type="text"
              {...register('website')}
              className="sr-only"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <Select label={t('jobs.role')} options={roleOptions} {...register('vagaId')} error={errors.vagaId?.message} />

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label={t('jobs.fullName')} {...register('nomeCompleto')} error={errors.nomeCompleto?.message} />
              <Input label={t('form.email')} type="email" {...register('email')} error={errors.email?.message} />
              <Input
                label={t('jobs.phone')}
                {...celularField}
                onChange={(e) => {
                  e.target.value = maskPhoneBR(e.target.value);
                  celularField.onChange(e);
                }}
                error={errors.celular?.message}
              />
              <Select
                label={t('form.state')}
                options={[{ value: '', label: '—' }, ...UFS.map((uf) => ({ value: uf, label: uf }))]}
                {...register('estado')}
                error={errors.estado?.message}
              />
              <Input label={t('form.city')} {...register('cidade')} error={errors.cidade?.message} className="sm:col-span-2" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <Input label={t('jobs.linkedin')} {...register('linkedin')} error={errors.linkedin?.message} placeholder="linkedin.com/in/..." />
              <Input
                label={t('jobs.portfolio')}
                {...register('portfolioUrl')}
                error={errors.portfolioUrl?.message}
                placeholder="https://"
              />
            </div>

            <div>
              <label htmlFor="cv-file" className="text-sm font-medium text-neutral-700 block mb-1">
                {t('jobs.cvOptional')}
              </label>
              <input
                id="cv-file"
                ref={fileRef}
                type="file"
                accept="application/pdf,.pdf"
                className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-white file:text-blue-700 hover:file:bg-neutral-50 border border-neutral-300 rounded-xl px-2 py-1.5"
              />
              <p className="text-xs text-neutral-500 mt-1">{t('jobs.cvHelp')}</p>
            </div>

            <Textarea
              label={t('jobs.coverLetter')}
              rows={6}
              {...register('mensagem')}
              error={errors.mensagem?.message}
              required
            />

            {vagaWatch && getJobById(vagaWatch) && (
              <p className="text-sm font-medium" style={{ color: COLORS.azulTech }}>
                {t('jobs.applyFor')}: {pickLocalized(getJobById(vagaWatch)!.title, language)}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting} className="w-full sm:w-auto">
              {t('jobs.submit')}
            </Button>
          </form>
        </section>
      </section>
    </>
  );
}

function JobOpeningCard({
  job,
  language,
  expanded,
  onToggle,
  onApply,
  t,
}: {
  job: JobOpening;
  language: Language;
  expanded: boolean;
  onToggle: () => void;
  onApply: () => void;
  t: (key: TranslationKey) => string;
}) {
  const title = pickLocalized(job.title, language);
  const excerpt = pickLocalized(job.excerpt, language);
  const location = job.location ? pickLocalized(job.location, language) : null;

  return (
    <article
      className="rounded-3xl border overflow-hidden shadow-sm bg-white"
      style={{ borderColor: COLORS.borderPill }}
    >
      <div className="grid md:grid-cols-12 gap-0">
        <div className="md:col-span-5">
          <JobImage src={job.imageSrc} alt={title} />
        </div>
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col">
          <h2 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: COLORS.azulCorp }}>
            {title}
          </h2>
          {location && (
            <p className="flex items-center gap-1.5 text-sm text-neutral-600 mb-3">
              <MapPin className="w-4 h-4 shrink-0 opacity-70" aria-hidden />
              {location}
            </p>
          )}
          <p className="text-neutral-700 mb-6 leading-relaxed">{excerpt}</p>

          <div className="mt-auto flex flex-wrap gap-3">
            <Button type="button" variant="primary" size="md" onClick={onApply}>
              {t('jobs.applyNow')}
            </Button>
            <Button type="button" variant="outline" size="md" className="gap-1.5" onClick={onToggle} aria-expanded={expanded}>
              {expanded ? t('jobs.collapse') : t('jobs.expand')}
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>

          {expanded && (
            <div className="mt-8 pt-8 border-t space-y-4" style={{ borderColor: COLORS.borderPill }}>
              <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
                {job.body.map((p, i) => (
                  <p key={i}>{pickLocalized(p, language)}</p>
                ))}
              </div>
              {job.requirements?.length ? (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-2">
                    {t('jobs.requirements')}
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-neutral-700">
                    {job.requirements.map((r, i) => (
                      <li key={i}>{pickLocalized(r, language)}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function CareersHeroVisual({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(!src.trim());

  if (failed) {
    return (
      <div
        className="rounded-3xl shadow-lg overflow-hidden aspect-[4/3] max-h-[420px] min-h-[220px] flex items-center justify-center bg-gradient-to-br from-[#251C59] to-[#005BED]"
        aria-hidden="true"
      >
        <Briefcase className="w-20 h-20 text-white/75" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full rounded-3xl shadow-lg object-cover aspect-[4/3] max-h-[min(420px,55vh)] min-h-[220px]"
      loading="eager"
      decoding="async"
      fetchPriority="high"
      onError={() => setFailed(true)}
    />
  );
}

function JobImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = React.useState(!src.trim());

  if (failed) {
    return (
      <div
        className="h-full min-h-[200px] md:min-h-[280px] flex items-center justify-center bg-gradient-to-br from-[#251C59] to-[#005BED]"
        aria-hidden="true"
      >
        <Briefcase className="w-16 h-16 text-white/75" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full min-h-[200px] md:min-h-full object-cover"
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
