import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { useLanguage } from '../../hooks/useLanguage';
import { useToast } from '../../hooks/useToast';
import { COLORS, DOMAIN, EMAIL, SEGMENTOS_CLIENTE, TAMANHO_FROTA, SOLUCOES, UFS } from '../../lib/constants';
import { queroSerClienteSchema, type QueroSerClienteFormData } from '../../lib/validators';
import { maskCNPJ, maskPhoneBR } from '../../lib/formUtils';

export default function QueroSerPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const startTime = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QueroSerClienteFormData>({
    resolver: zodResolver(queroSerClienteSchema),
  });

  // Masked field registrations
  const cnpjField = register('cnpj');
  const celularField = register('celular');
  const fixoField = register('fixo');

  async function onSubmit(data: QueroSerClienteFormData) {
    if (Date.now() - startTime.current < 3000) return;
    if ((data as any).website) return;

    const fd = new FormData();
    fd.append('_subject', '[Cliente] Quero ser Cliente');
    fd.append('_captcha', 'false');
    fd.append('_template', 'table');
    Object.entries(data).forEach(([k, v]) => fd.append(k, v as string));

    try {
      await fetch(`https://formsubmit.co/${EMAIL}`, { method: 'POST', body: fd });
      navigate('/obrigado');
    } catch {
      addToast('error', t('contact.errorMsg'));
    }
  }

  return (
    <>
      <SEOHead
        title="Clientes | Quero ser Cliente | InstaSolutions"
        description="Solicite uma demonstração e comece a otimizar a gestão da sua frota com a InstaSolutions."
        canonical={`${DOMAIN}/clientes/queroser`}
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 mb-10 items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: COLORS.azulCorp }}>
              {t('client.title')}
            </h1>
            <div className="text-neutral-600 space-y-3 text-sm">
              <p>{t('client.desc1')}</p>
              <p>{t('client.desc2')}</p>
              <p>{t('client.desc3')}</p>
              <p><strong>{t('client.desc4')}</strong></p>
            </div>
          </div>
          <img
            src="/imagens/contato_foto.png"
            alt="Sua frota em dia com a InstaSolutions"
            className="rounded-2xl shadow-lg"
            loading="lazy"
            decoding="async"
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          {/* Honeypot */}
          <input type="text" {...register('website' as any)} className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <div className="grid sm:grid-cols-2 gap-4">
            <Input label={t('form.cnpj')} {...cnpjField} onChange={(e) => { e.target.value = maskCNPJ(e.target.value); cnpjField.onChange(e); }} error={errors.cnpj?.message} />
            <Input label={t('form.companyName')} {...register('razaoSocial')} error={errors.razaoSocial?.message} />
            <Input label={t('form.tradeName')} {...register('nomeFantasia')} error={errors.nomeFantasia?.message} />
            <Input label={t('form.neighborhood')} {...register('bairro')} error={errors.bairro?.message} />
            <Input label={t('form.address')} {...register('endereco')} error={errors.endereco?.message} className="sm:col-span-2" />
            <Select
              label={t('form.state')}
              options={UFS.map((u) => ({ value: u, label: u }))}
              {...register('estado')}
              error={errors.estado?.message}
            />
            <Input label={t('form.city')} {...register('cidade')} error={errors.cidade?.message} />
            <Input label={t('form.email')} type="email" {...register('email')} error={errors.email?.message} />
            <Input label={t('form.responsible')} {...register('responsavel')} error={errors.responsavel?.message} />
            <Select
              label={t('form.segment')}
              options={SEGMENTOS_CLIENTE.map((s) => ({ value: s, label: s }))}
              {...register('segmento')}
              error={errors.segmento?.message}
            />
            <Select
              label={t('form.fleetSize')}
              options={TAMANHO_FROTA.map((s) => ({ value: s, label: s }))}
              {...register('tamanhoFrota')}
              error={errors.tamanhoFrota?.message}
            />
            <Input label={t('form.mobilePhone')} {...celularField} onChange={(e) => { e.target.value = maskPhoneBR(e.target.value); celularField.onChange(e); }} error={errors.celular?.message} />
            <Input label={t('form.landline')} {...fixoField} onChange={(e) => { e.target.value = maskPhoneBR(e.target.value); fixoField.onChange(e); }} error={errors.fixo?.message} />
            <Select
              label={t('form.solution')}
              options={SOLUCOES.map((s) => ({ value: s, label: s }))}
              {...register('solucao')}
              error={errors.solucao?.message}
              className="sm:col-span-2"
            />
          </div>

          <Button type="submit" variant="primary" size="lg" isLoading={isSubmitting}>
            {t('form.send')}
          </Button>
        </form>
      </section>
    </>
  );
}
