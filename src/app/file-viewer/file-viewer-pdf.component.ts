import { Component, ViewEncapsulation, Input, OnInit, ViewChild } from '@angular/core';
import { NgxExtendedPdfViewerComponent } from 'ngx-extended-pdf-viewer';

/**
 * PDF viewer used to receive a pdf file (base64 or pdf itself) and display it with some default commands.
 * @package ngx-extended-pdf-viewer
 */
@Component({
    selector: 'file-viewer-pdf',
    encapsulation: ViewEncapsulation.None,
    templateUrl: './file-viewer-pdf.template.html',
    styleUrls: ['./file-viewer-pdf.style.scss']
})
export class FileViewerPdfComponent implements OnInit {

    /**
     * NgxExtendedPdfViewerComponent reference to get attributes, like container size and zoom
     */
    @ViewChild('pdfViewer') public pdfViewer: NgxExtendedPdfViewerComponent;

    /**
     * Filename input. Can be used to name the file to be downloaded
     */
    @Input() public fileName: string = '';

    /**
     * Src input that accepts a base64 or pdf itself
     */
    @Input() set src(value: any) {
        this._src = value;
    }

    /**
     * Option to display controls on the right side of the the viewer
     * @default false
     */
    @Input() public sideControls: boolean = false;

    /**
     * Convert from base64 src to a array buffer
     */
    @Input() public convertFromBase64: boolean = true;

    /**
     * Initial zoom. Number is equivalent to a percentage view
     * Initiates at undefined to fit the screen
     */
    public zoom: any;

    /**
     * Src property to be used after treated
     */
    public _src: any = null;

    /**
     * Enable pagination option to display controls if there is more than 1 page
     * @default false
     */
    public enablePagination: boolean = false;

    /**
     * Number of pages
     */
    public pages: number = 1;

    /**
     * Page number control. Starts at 1 and changes as the user navigates
     * @default 1
     */
    public currentPage: number = 1;

    /**
     * Original base64 content, used on file download option
     */
    private originalBase64: any = null;

    /**
     * Zoom Factor (to calculate zoom change level according to screen size)
     */
    private zoomFactor: any;

    /**
     * Initially convert (if necessary) the base64 file to a array buffer
     */
    public ngOnInit() {

        if (this.convertFromBase64) {
            this.originalBase64 = this._src;
            this._src = this.base64ToArrayBuffer(this._src);
        }
    }

    /**
     * Check data after the content is loaded to determine pagination use
     * @param event - Load event
     */
    public checkData(event): void {
        this.pages = event.pagesCount;
        if (this.pages > 1) {
            this.enablePagination = true;
        }
    }

    /**
     * Zoom in option. Increment zoom by 10 (10%) on each use
     */
    public zoomIn() {
        if (!this.pdfViewer.zoom) {
            this.zoom = this.zoomFactor ? this.zoomFactor : 100;
        }

        this.zoom = this.zoom + 10;
    }

    /**
     * Zoom out option. Decrement zoom by 10 (10%) on each use
     */
    public zoomOut() {
        if (!this.pdfViewer.zoom) {
            this.zoom = this.zoomFactor ? this.zoomFactor : 100;
        }

        this.zoom = this.zoom - 10;
    }

    /**
     * Centralize and reset zoom to the initial value (undefined, so it fits the screen)
     */
    public centralize() {
        this.zoom = undefined;
    }

    /**
     * Download original base64 using the fileName set
     */
    public download() {
        //NOT IMPLEMENTED HERE
    }

    /**
     * Advance to next page using the pagination option
     */
    public nextPage() {
        this.currentPage = this.currentPage + 1;
    }

    /**
     * Back to previous page using the pagination option
     */
    public previousPage() {
        this.currentPage = this.currentPage - 1;
    }

    /**
     * Calculates the zoom factor, according to screen availablie width and height
     * Ex; On higher resolutions, the zoom factor is 100%, while in smaller screens, it must 80%
     */
    public setZoomFactor() {
        try {
            const calc =
                (this.pdfViewer.root.nativeElement.clientWidth / this.pdfViewer.root.nativeElement.clientHeight);
            this.zoomFactor = ((Math.floor(calc * 10) / 10) + 0.2) * 100;
        } catch (ex) {
            console.log('Error calculating zoom factor: ', ex);
            this.zoomFactor = 100;
        }
    }

    /**
     * Convert from base64 to Array buffer data format
     * @param base64 - Original base64 file data
     */
    private base64ToArrayBuffer(base64) {
        const binaryString = window.atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}