import { z } from 'zod';
import { isValidCNPJ } from './formUtils';

// Base fields shared across forms
const cnpjField = z
  .string()
  .min(1, 'CNPJ é obrigatório')
  .refine((v) => isValidCNPJ(v), 'CNPJ inválido');

const emailField = z.string().min(1, 'E-mail é obrigatório').email('E-mail inválido');
const phoneField = z.string().min(14, 'Telefone inválido');

export const credenciarSchema = z.object({
  CNPJ: cnpjField,
  'Razao Social': z.string().min(2, 'Razão Social é obrigatória'),
  'Nome Fantasia': z.string().min(2, 'Nome Fantasia é obrigatório'),
  Bairro: z.string().optional(),
  Endereco: z.string().optional(),
  Estado: z.string().min(2, 'Estado é obrigatório'),
  Cidade: z.string().min(2, 'Cidade é obrigatória'),
  Email: emailField,
  Responsavel: z.string().optional(),
  CPF_RG: z.string().optional(),
  DDD_Celular: z.string().optional(),
  DDD_Fixo: z.string().optional(),
  Bandeira: z.string().optional(),
  'Segmento de atuação': z.string().optional(),
  termos: z.literal(true, { errorMap: () => ({ message: 'É necessário aceitar os termos' }) }),
});

export type CredenciarFormData = z.infer<typeof credenciarSchema>;

export const queroSerClienteSchema = z.object({
  CNPJ: cnpjField,
  'Razao Social': z.string().min(2, 'Razão Social é obrigatória'),
  'Nome Fantasia': z.string().min(2, 'Nome Fantasia é obrigatório'),
  Bairro: z.string().optional(),
  Endereco: z.string().optional(),
  Estado: z.string().min(2, 'Estado é obrigatório'),
  Cidade: z.string().min(2, 'Cidade é obrigatória'),
  Email: emailField,
  Responsavel: z.string().optional(),
  'Segmento de atuacao': z.string().min(1, 'Segmento é obrigatório'),
  'Quantidade de veiculos': z.string().min(1, 'Quantidade é obrigatória'),
  DDD_Celular: phoneField.or(z.literal('')),
  DDD_Fixo: z.string().optional(),
  Solucao: z.string().min(1, 'Solução é obrigatória'),
});

export type QueroSerClienteFormData = z.infer<typeof queroSerClienteSchema>;

export const contatoSchema = z.object({
  CNPJ: z.string().optional(),
  'Razao Social': z.string().optional(),
  'Nome Fantasia': z.string().optional(),
  Bairro: z.string().optional(),
  Endereco: z.string().optional(),
  Estado: z.string().optional(),
  Cidade: z.string().optional(),
  Email: emailField,
  Responsavel: z.string().min(2, 'Nome é obrigatório'),
  'Segmento de atuacao': z.string().optional(),
  'Quantidade de veiculos': z.string().optional(),
  DDD_Celular: z.string().optional(),
  DDD_Fixo: z.string().optional(),
  Solucao: z.string().optional(),
});

export type ContatoFormData = z.infer<typeof contatoSchema>;
