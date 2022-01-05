import { VStack, Heading, List, ListItem } from '@chakra-ui/react';

import { Project } from '../types';
import ProjectInfoCard from './ProjectInfoCard';
ProjectInfoCard;

type Props = {
  projects: Project[];
};

const ProjectsSectionList = ({ projects }: Props) => {
  return (
    <VStack w="full" alignItems="flex-start" spacing={4} as="section" mt={16}>
      <Heading size="md">Open Source Projects I&#39;ve Worked on</Heading>
      <List spacing={6}>
        {projects.map(project => (
          <ListItem key={project.href}>
            <ProjectInfoCard {...project} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default ProjectsSectionList;
