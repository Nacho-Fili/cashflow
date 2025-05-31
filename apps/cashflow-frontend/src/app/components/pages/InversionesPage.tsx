
import React from 'react';
import { PageTitle } from '../molecules/PageTitle';

const PlaceholderContent: React.FC<{ title: string }> = ({ title }) => (
  <>
    <PageTitle title={title} subtitle={`Contenido para ${title} estará disponible pronto.`} />
    <div className="bg-neutral-700 p-6 rounded-xl shadow-lg min-h-[300px] flex items-center justify-center">
      <p className="text-neutral-300 text-xl">Página de {title} en construcción.</p>
    </div>
  </>
);

export const InversionesPage: React.FC = () => <PlaceholderContent title="Inversiones" />;
