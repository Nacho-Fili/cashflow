import React from 'react';
import { PageTitle } from '../molecules/PageTitle';

interface AnalisisPageProps {
  title: string;
}
export const AnalisisPage: React.FC<AnalisisPageProps> = ({ title }) => {
  return (
    <PageTitle title={title} subtitle={`Contenido para ${title} estará disponible pronto.`} />
  );
};
