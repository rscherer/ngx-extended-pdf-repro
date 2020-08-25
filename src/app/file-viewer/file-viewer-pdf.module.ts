import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileViewerPdfComponent } from './file-viewer-pdf.component';

// Dependencies
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

@NgModule({
    declarations: [
        FileViewerPdfComponent
    ],
    imports: [
        CommonModule,
        NgxExtendedPdfViewerModule
    ],
    exports: [
        FileViewerPdfComponent
    ]
})
export class FileViewerPdfModule {
}
