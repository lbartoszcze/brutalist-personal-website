'use client';

import React from 'react';

// Foundations
import { Colors } from '../../../brutalist/foundations/Colors';
import { Typography } from '../../../brutalist/foundations/Typography';
import { HandDrawnIcons } from '../../../brutalist/foundations/HandDrawnIcons';
import { SpacingGrids } from '../../../brutalist/foundations/SpacingGrids';
import { Effects } from '../../../brutalist/foundations/Effects';
import { Brand } from '../../../brutalist/foundations/Brand';

// Utility Elements
import { Attachment } from '../../../brutalist/utility-elements/Attachment';
import { Avatars } from '../../../brutalist/utility-elements/Avatars';
import { Buttons } from '../../../brutalist/utility-elements/Buttons';
import { ButtonGroup } from '../../../brutalist/utility-elements/ButtonGroup';
import { Badges } from '../../../brutalist/utility-elements/Badges';
import { Checkbox } from '../../../brutalist/utility-elements/Checkbox';
import { Radio } from '../../../brutalist/utility-elements/Radio';
import { Toggle } from '../../../brutalist/utility-elements/Toggle';
import { Menu } from '../../../brutalist/utility-elements/Menu';
import { Dropdown } from '../../../brutalist/utility-elements/Dropdown';
import { FormFields } from '../../../brutalist/utility-elements/FormFields';
import { ProgressBar } from '../../../brutalist/utility-elements/ProgressBar';
import { RangeSlider } from '../../../brutalist/utility-elements/RangeSlider';
import { Tags } from '../../../brutalist/utility-elements/Tags';
import { Tooltips } from '../../../brutalist/utility-elements/Tooltips';

// Interactive Components
import { Accordion } from '../../../brutalist/interactive-components/Accordion';
import { Alert } from '../../../brutalist/interactive-components/Alert';
import { Breadcrumbs } from '../../../brutalist/interactive-components/Breadcrumbs';
import { CoachMark } from '../../../brutalist/interactive-components/CoachMark';
import { Divider } from '../../../brutalist/interactive-components/Divider';
import { Datepicker } from '../../../brutalist/interactive-components/Datepicker';
import { FileUploader } from '../../../brutalist/interactive-components/FileUploader';
import { EmptyState } from '../../../brutalist/interactive-components/EmptyState';
import { Loader } from '../../../brutalist/interactive-components/Loader';
import { FlyoutMenu } from '../../../brutalist/interactive-components/FlyoutMenu';
import { Navbar } from '../../../brutalist/interactive-components/Navbar';
import { Pagination } from '../../../brutalist/interactive-components/Pagination';
import { Steps } from '../../../brutalist/interactive-components/Steps';
import { Tabs } from '../../../brutalist/interactive-components/Tabs';
import { Sidebar } from '../../../brutalist/interactive-components/SidebarNavigations';
import { Table } from '../../../brutalist/interactive-components/Table';
import { BarChart } from '../../../brutalist/interactive-components/Charts';
import { Modal } from '../../../brutalist/interactive-components/Modals';
import { StatItem } from '../../../brutalist/interactive-components/Stats';
import { NotificationExamples } from '../../../brutalist/interactive-components/Notifications';
import { RadioGroupsExamples } from '../../../brutalist/interactive-components/RadioGroups';
import { ActionPanelsExamples } from '../../../brutalist/interactive-components/ActionPanels';
import { StackedExamples } from '../../../brutalist/interactive-components/Stacked';
import { PageHeader } from '../../../brutalist/HeadingFooters/PageHeader';
import { SectionHeader } from '../../../brutalist/HeadingFooters/SectionHeader';

// Marketing UI Sections
import { Hero } from '../../../brutalist/marketing-ui-sections/Hero';
import { FeatureList } from '../../../brutalist/feature-list/FeatureList';
import { TestimonialExamples } from '../../../brutalist/marketing-ui-sections/Testimonial';
import { PricingExamples } from '../../../brutalist/marketing-ui-sections/Pricing';
import { Footer } from '../../../brutalist/HeadingFooters/Footer';
import { TeamExamples } from '../../../brutalist/marketing-ui-sections/Team';
import { CTAExamples } from '../../../brutalist/marketing-ui-sections/CTA';
import { LogoCloudExamples } from '../../../brutalist/marketing-ui-sections/LogoCloud';
import { BannerExamples } from '../../../brutalist/marketing-ui-sections/Banner';
import { FAQExamples } from '../../../brutalist/marketing-ui-sections/FAQ';

export default function DesignSystem() {
  return (
    <div className="container mx-auto p-4 pb-32">
      <h1 className="text-4xl font-bold my-8">Brutalist Design System</h1>
      
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Navigation</h2>
        <nav className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold mb-2">Foundations</h3>
            <ul className="space-y-1">
              <li><a href="#colors" className="text-blue-600 hover:underline">Colors</a></li>
              <li><a href="#typography" className="text-blue-600 hover:underline">Typography</a></li>
              <li><a href="#hand-drawn-icons" className="text-blue-600 hover:underline">Hand-drawn Icons</a></li>
              <li><a href="#spacing-grids" className="text-blue-600 hover:underline">Spacing & Grids</a></li>
              <li><a href="#effects" className="text-blue-600 hover:underline">Effects</a></li>
              <li><a href="#brand" className="text-blue-600 hover:underline">Brand</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Utility Elements</h3>
            <ul className="space-y-1">
              <li><a href="#attachment" className="text-blue-600 hover:underline">Attachment</a></li>
              <li><a href="#avatars" className="text-blue-600 hover:underline">Avatars</a></li>
              <li><a href="#buttons" className="text-blue-600 hover:underline">Buttons</a></li>
              <li><a href="#button-group" className="text-blue-600 hover:underline">Button Group</a></li>
              <li><a href="#badges" className="text-blue-600 hover:underline">Badges</a></li>
              <li><a href="#form-elements" className="text-blue-600 hover:underline">Form Elements</a></li>
              <li><a href="#other-utils" className="text-blue-600 hover:underline">Other Utilities</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Components</h3>
            <ul className="space-y-1">
              <li><a href="#interactive" className="text-blue-600 hover:underline">Interactive Components</a></li>
              <li><a href="#marketing" className="text-blue-600 hover:underline">Marketing UI Sections</a></li>
            </ul>
          </div>
        </nav>
      </div>
      
      {/* FOUNDATIONS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 border-b-2 pb-2">Foundations</h2>
        
        <div id="colors" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Colors</h3>
          <Colors />
        </div>
        
        <div id="typography" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Typography</h3>
          <Typography />
        </div>
        
        <div id="hand-drawn-icons" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Hand-drawn Icons</h3>
          <HandDrawnIcons />
        </div>
        
        <div id="spacing-grids" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Spacing & Grids</h3>
          <SpacingGrids />
        </div>
        
        <div id="effects" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Effects</h3>
          <Effects />
        </div>
        
        <div id="brand" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Brand</h3>
          <Brand />
        </div>
      </section>
      
      {/* UTILITY ELEMENTS */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold mb-6 border-b-2 pb-2">Utility Elements</h2>
        
        <div id="attachment" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Attachment</h3>
          <Attachment fileName="example.pdf" fileSize="2.4 MB" fileType="PDF" />
        </div>
        
        <div id="avatars" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Avatars</h3>
          <Avatars />
        </div>
        
        <div id="buttons" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Buttons</h3>
          <Buttons />
        </div>
        
        <div id="button-group" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Button Group</h3>
          <ButtonGroup>
            <button>Option 1</button>
            <button>Option 2</button>
            <button>Option 3</button>
          </ButtonGroup>
        </div>
        
        <div id="badges" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Badges</h3>
          <Badges />
        </div>
        
        <div id="form-elements" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Form Elements</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-2">Checkbox</h4>
              <Checkbox />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Radio</h4>
              <Radio />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Toggle</h4>
              <Toggle />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Form Fields</h4>
              <FormFields />
            </div>
          </div>
        </div>
        
        <div id="other-utils" className="mb-16">
          <h3 className="text-2xl font-bold mb-4">Other Utilities</h3>
          <div className="space-y-8">
            <div>
              <h4 className="text-xl font-bold mb-2">Menu</h4>
              <Menu 
                trigger={<button>Open Menu</button>}
                items={[
                  { id: '1', label: 'Item 1', onClick: () => {} },
                  { id: '2', label: 'Item 2', onClick: () => {} },
                  { id: '3', label: 'Item 3', onClick: () => {} }
                ]}
              />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Dropdown</h4>
              <Dropdown 
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' },
                  { value: 'option3', label: 'Option 3' }
                ]}
                onChange={() => {}}
              />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Progress Bar</h4>
              <ProgressBar value={65} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Range Slider</h4>
              <RangeSlider />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Tags</h4>
              <Tags tags={[
                { id: '1', label: 'Design' },
                { id: '2', label: 'Development' },
                { id: '3', label: 'Brutalist' }
              ]} />
            </div>
            <div>
              <h4 className="text-xl font-bold mb-2">Tooltips</h4>
              <Tooltips />
            </div>
          </div>
        </div>
      </section>
      
      {/* INTERACTIVE COMPONENTS */}
      <section id="interactive" className="mb-20">
        <h2 className="text-3xl font-bold mb-6 border-b-2 pb-2">Interactive Components</h2>
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Accordion</h3>
            <Accordion>
              <div>
                <h4>Section 1</h4>
                <p>Content for section 1</p>
              </div>
              <div>
                <h4>Section 2</h4>
                <p>Content for section 2</p>
              </div>
            </Accordion>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Alert</h3>
            <Alert>This is a sample alert message</Alert>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Breadcrumbs</h3>
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' },
                { label: 'Components', href: '/components' },
                { label: 'Breadcrumbs', href: '/components/breadcrumbs' }
              ]} 
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Coach Mark</h3>
            <div>Target Element</div>
            <CoachMark target={React.useRef(null)}>
              This is a sample coach mark
            </CoachMark>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Divider</h3>
            <Divider />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Datepicker</h3>
            <Datepicker />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">File Uploader</h3>
            <FileUploader />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Empty State</h3>
            <EmptyState 
              title="No items found"
              description="Try adjusting your search or filters"
              action={<button>Add Item</button>}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Loader</h3>
            <Loader />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Flyout Menu</h3>
            <FlyoutMenu 
              trigger={<button>Open Flyout</button>}
              items={[
                { id: '1', label: 'Item 1' },
                { id: '2', label: 'Item 2' },
                { id: '3', label: 'Item 3' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Navbar</h3>
            <Navbar />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Pagination</h3>
            <Pagination 
              currentPage={1}
              totalPages={10}
              onPageChange={(page) => console.log(`Page ${page} selected`)}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Steps</h3>
            <Steps 
              steps={[
                { id: '1', title: 'Step 1', description: 'First step' },
                { id: '2', title: 'Step 2', description: 'Second step' },
                { id: '3', title: 'Step 3', description: 'Third step' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Tabs</h3>
            <Tabs 
              items={[
                { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
                { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
                { id: 'tab3', label: 'Tab 3', content: 'Content 3' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Sidebar Navigations</h3>
            <Sidebar 
              items={[
                { id: '1', label: 'Home', href: '/' },
                { id: '2', label: 'Components', href: '/components' },
                { id: '3', label: 'Documentation', href: '/docs' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Table</h3>
            <Table 
              columns={[
                { id: 'id', accessor: (row) => row.id, header: 'ID' },
                { id: 'name', accessor: (row) => row.name, header: 'Name' },
                { id: 'email', accessor: (row) => row.email, header: 'Email' }
              ]}
              data={[
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Charts</h3>
            <BarChart data={[
              { label: 'A', value: 10 },
              { label: 'B', value: 20 },
              { label: 'C', value: 30 }
            ]} />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Modals</h3>
            <Modal isOpen={false} onClose={() => {}}>
              <div>Modal Content</div>
            </Modal>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Stats</h3>
            <StatItem 
              label="Total Users"
              value="1,234"
              description="Active users in the last 30 days"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Notifications</h3>
            <NotificationExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Heading & Footers</h3>
            <div className="space-y-8">
              <PageHeader title="Design System" />
              <SectionHeader title="Components Section" />
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Radio Groups</h3>
            <RadioGroupsExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Action Panels</h3>
            <ActionPanelsExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Stacked</h3>
            <StackedExamples />
          </div>
        </div>
      </section>
      
      {/* MARKETING UI SECTIONS */}
      <section id="marketing" className="mb-20">
        <h2 className="text-3xl font-bold mb-6 border-b-2 pb-2">Marketing UI Sections</h2>
        <div className="space-y-16">
          <div>
            <h3 className="text-2xl font-bold mb-4">Hero</h3>
            <Hero 
              title="Welcome to the Design System"
              subtitle="A collection of reusable components"
              description="Explore our comprehensive library of brutalist design components"
              ctaText="Get Started"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Feature</h3>
            <FeatureList 
              title="Features"
              features={[
                { title: 'Feature 1', description: 'Description 1' },
                { title: 'Feature 2', description: 'Description 2' },
                { title: 'Feature 3', description: 'Description 3' }
              ]}
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Testimonial</h3>
            <TestimonialExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Pricing</h3>
            <PricingExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Footer</h3>
            <Footer />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Team</h3>
            <TeamExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">CTA</h3>
            <CTAExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Logo Cloud</h3>
            <LogoCloudExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Banner</h3>
            <BannerExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">FAQ</h3>
            <FAQExamples />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Page Header</h3>
            <PageHeader title="Design System" />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Section Header</h3>
            <SectionHeader title="Components Section" />
          </div>
        </div>
      </section>
    </div>
  );
} 